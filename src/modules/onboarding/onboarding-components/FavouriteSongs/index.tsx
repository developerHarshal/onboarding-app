import { FavouriteSongsSchema } from '@/common/schemas/favouriteSongs.schema';
import { convertFilesToBase64 } from '@/common/utils/file';
import { Form, FormikProvider, useFormik } from 'formik';
import { Box, Grid, Input, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import { saveFavouriteSongs, setOnboardingStep } from '../../state/onboardingSlice';
import { useState, type ChangeEvent } from 'react';
import { ONBOARDING_STEPS } from '@/common/constants/onboarding/onboarding-steps';
import { getOnboardingStepUrl } from '@/common/constants/routing/routes';
import { useNavigate } from 'react-router-dom';

type FavouriteSongsFormProps = {
    submitFormId: string;
};

export const FavouriteSongsForm: React.FC<FavouriteSongsFormProps> = ({ submitFormId }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const savedSongs = useAppSelector((state) => state.onboarding.favouriteSongs.favouriteSongs);
    const [selectedFileNames, setSelectedFileNames] = useState<string[]>([]);

    const formik = useFormik({
        initialValues: {
            favouriteSongs: savedSongs,
        },
        validationSchema: FavouriteSongsSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(saveFavouriteSongs({ favouriteSongs: values.favouriteSongs }));
            dispatch(setOnboardingStep(ONBOARDING_STEPS.PAYMENT));
            navigate(getOnboardingStepUrl(ONBOARDING_STEPS.PAYMENT));
        },
    });

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files;

        if (!files?.length) {
            return;
        }

        const fileList = Array.from(files);

        try {
            const base64Files = await convertFilesToBase64(fileList);
            formik.setFieldError('favouriteSongs', undefined);
            formik.setFieldValue('favouriteSongs', base64Files);
            formik.setFieldTouched('favouriteSongs', true, false);
            setSelectedFileNames(fileList.map((file) => file.name));
        } catch (error) {
            formik.setFieldTouched('favouriteSongs', true, false);
            formik.setFieldError(
                'favouriteSongs',
                error instanceof Error ? error.message : 'Failed to read one or more files'
            );
        }
    };

    const hasSavedSongs = savedSongs.length > 0;
    const previewSongs = formik.values.favouriteSongs;

    return (
        <FormikProvider value={formik}>
            <Form id={submitFormId} onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                        {previewSongs.length > 0 && (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography variant="body2" color="text.secondary">
                                    {selectedFileNames.length > 0
                                        ? `New files: ${selectedFileNames.join(', ')}`
                                        : hasSavedSongs
                                          ? `Saved favourite songs (${previewSongs.length})`
                                          : `Selected songs (${previewSongs.length})`}
                                </Typography>
                                {previewSongs.map((song, index) => (
                                    <Box
                                        key={`${selectedFileNames[index] ?? 'saved'}-${index}`}
                                        component="audio"
                                        controls
                                        src={song}
                                        sx={{ width: '100%' }}
                                    />
                                ))}
                            </Box>
                        )}
                        <Input
                            type="file"
                            name="favouriteSongs"
                            inputProps={{ accept: 'audio/*', multiple: true }}
                            onChange={handleFileChange}
                            onBlur={formik.handleBlur}
                        />
                        <Typography variant="caption" color="text.secondary">
                            {hasSavedSongs
                                ? 'Upload new files to replace the saved ones (5MB max per file)'
                                : 'Upload favourite song files (5MB max per file)'}
                        </Typography>
                        {formik.touched.favouriteSongs && formik.errors.favouriteSongs && (
                            <Typography variant="caption" color="error">
                                {formik.errors.favouriteSongs as string}
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Form>
        </FormikProvider>
    );
};

export default FavouriteSongsForm;
