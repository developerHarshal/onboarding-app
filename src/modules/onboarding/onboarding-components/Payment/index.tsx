import { Form, FormikProvider, useFormik } from 'formik';
import { PaymentSchema } from '@/common/schemas/payment.schema';
import { Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hook';
import { savePaymentDetails, setOnboardingStep, type PaymentDetails } from '../../state/onboardingSlice';
import { ONBOARDING_STEPS } from '@/common/constants/onboarding/onboarding-steps';
import { getOnboardingStepUrl } from '@/common/constants/routing/routes';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({ submitFormId }: { submitFormId: string }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const savedPayment = useAppSelector((state) => state.onboarding.paymentDetails);

    const formik = useFormik({
        initialValues: {
            cardNumber: savedPayment.cardNumber,
            expiryDate: savedPayment.expiryDate,
            cvv: savedPayment.cvv,
        },
        validationSchema: PaymentSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
            dispatch(savePaymentDetails(values as PaymentDetails));
            dispatch(setOnboardingStep(ONBOARDING_STEPS.SUCCESS));
            navigate(getOnboardingStepUrl(ONBOARDING_STEPS.SUCCESS));
        },
    });

    return (
        <FormikProvider value={formik}>
            <Form id={submitFormId} onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <TextField
                        required
                        label="Card Number"
                        {...formik.getFieldProps('cardNumber')}
                        error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                        helperText={formik.touched.cardNumber && (formik.errors.cardNumber as string)}
                    />
                    <TextField
                        required
                        label="Expiry Date"
                        {...formik.getFieldProps('expiryDate')}
                        error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                        helperText={formik.touched.expiryDate && (formik.errors.expiryDate as string)}
                    />
                    <TextField
                        required
                        label="CVV"
                        {...formik.getFieldProps('cvv')}
                        error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                        helperText={formik.touched.cvv && (formik.errors.cvv as string)}
                    />
                </Grid>
            </Form>
        </FormikProvider>
    );
}

export default PaymentForm