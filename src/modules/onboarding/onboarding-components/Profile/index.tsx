import { ProfileSchema } from '@/common/schemas/profile.schema';
import { convertToBase64, getFileSizeError } from '@/common/utils/file';
import { Form, FormikProvider, useFormik } from 'formik';
import { Box, Grid, Input, TextField, Typography } from '@mui/material';
import { saveProfile, setOnboardingStep, type ProfileDetails } from '../../state/onboardingSlice';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import { ONBOARDING_STEPS } from '@/common/constants/onboarding/onboarding-steps';
import { useNavigate } from 'react-router-dom';
import { getOnboardingStepUrl } from '@/common/constants/routing/routes';
import { useState, type ChangeEvent } from 'react';

type ProfileFormProps = {
    onSuccess: () => void;
    submitFormId: string;
};

const ProfileForm = ({ onSuccess, submitFormId }: ProfileFormProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const savedProfile = useAppSelector((state) => state.onboarding.profileDetails);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    const formik = useFormik({
        initialValues: {
            name: savedProfile.name,
            age: savedProfile.age,
            email: savedProfile.email,
            profilePicture: savedProfile.profilePicture,
        },
        validationSchema: ProfileSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(saveProfile(values as ProfileDetails));
            dispatch(setOnboardingStep(ONBOARDING_STEPS.FAVOURITE_SONGS));
            navigate(getOnboardingStepUrl(ONBOARDING_STEPS.FAVOURITE_SONGS));
            onSuccess();
        },
    });

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];

        if (!file) {
            return;
        }

        const sizeError = getFileSizeError(file);

        if (sizeError) {
            formik.setFieldTouched('profilePicture', true, false);
            formik.setFieldError('profilePicture', sizeError);
            return;
        }

        try {
            const base64 = await convertToBase64(file);
            formik.setFieldError('profilePicture', undefined);
            formik.setFieldValue('profilePicture', base64);
            formik.setFieldTouched('profilePicture', true, false);
            setSelectedFileName(file.name);
        } catch {
            formik.setFieldTouched('profilePicture', true, false);
            formik.setFieldError('profilePicture', 'Failed to read profile picture');
        }
    };

    const hasSavedPicture = Boolean(savedProfile.profilePicture);
    const previewSrc = formik.values.profilePicture;

    return (
        <FormikProvider value={formik}>
            <Form id={submitFormId} onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <TextField
                        required
                        label="Name"
                        {...formik.getFieldProps('name')}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && (formik.errors.name as string)}
                    />
                    <TextField
                        required
                        label="Age"
                        {...formik.getFieldProps('age')}
                        type="number"
                        error={formik.touched.age && Boolean(formik.errors.age)}
                        helperText={formik.touched.age && (formik.errors.age as string)}
                    />
                    <TextField
                        required
                        label="Email"
                        {...formik.getFieldProps('email')}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && (formik.errors.email as string)}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
                        {previewSrc && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Box
                                    component="img"
                                    src={previewSrc}
                                    alt="Profile preview"
                                    sx={{
                                        width: 100,
                                        height: 100,
                                        objectFit: 'cover',
                                        borderRadius: 1,
                                        border: 1,
                                        borderColor: 'divider',
                                    }}
                                />
                                <Typography variant="body2" color="text.secondary">
                                    {selectedFileName
                                        ? `New image: ${selectedFileName}`
                                        : hasSavedPicture
                                            ? 'Saved profile picture'
                                            : 'Profile picture'}
                                </Typography>
                            </Box>
                        )}
                        <Input
                            type="file"
                            name="profilePicture"
                            inputProps={{ accept: 'image/*' }}
                            onChange={handleFileChange}
                            onBlur={formik.handleBlur}
                        />
                        <Typography variant="caption" color="text.secondary">
                            {hasSavedPicture
                                ? 'Upload a new image to replace the saved one (5MB max)'
                                : 'Upload a profile picture (5MB max)'}
                        </Typography>
                        {formik.touched.profilePicture && formik.errors.profilePicture && (
                            <Typography variant="caption" color="error">
                                {formik.errors.profilePicture as string}
                            </Typography>
                        )}
                    </Box>
                </Grid>
            </Form>
        </FormikProvider>
    );
};

export default ProfileForm;
