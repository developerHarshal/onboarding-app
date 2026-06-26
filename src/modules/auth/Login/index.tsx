import { useFormik } from 'formik';
import { LoginSchema } from '@schemas/login.schema';
import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import { useNavigate } from 'react-router-dom';
import { login } from './state/authSlice';

const Login = () => {
    const { loading, error } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            try {
                await dispatch(login(values)).unwrap();
                navigate('/dashboard');
            } catch (err) {
                console.error(err);
            }
        }
    })
    return (
        <Box>
            <Paper elevation={5} sx={{ p: 4 }} square={false}>
                <Container maxWidth="md" sx={{ minWidth: '500px' }}>
                    <Typography variant='h5' gutterBottom align='center'>Login</Typography>
                    <Box component="form"
                        onSubmit={formik.handleSubmit}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}>
                        <TextField {...formik.getFieldProps("username")} label="Email" variant='outlined' fullWidth required
                            error={formik.touched.username &&
                                Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}

                        />
                        <TextField {...formik.getFieldProps("password")} type="password" label="Password" variant='outlined' fullWidth required
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            helperText={
                                formik.touched.password &&
                                formik.errors.password
                            } />
                        <Button variant='outlined' type='submit' sx={{ minWidth: "100px", m: 'auto' }} loading={loading}>Login</Button>
                        {error && <Typography variant='caption' color="theme.pallete.error.main">{error}</Typography>}
                    </Box>
                </Container>
            </Paper>
        </Box>
    )
}

export default Login;