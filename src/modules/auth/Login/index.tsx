import { useFormik } from 'formik';
import { LoginSchema } from '@schemas/login.schema';
import { Box, Button, Container, Grow, Paper, TextField, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/app/store';
import { useNavigate } from 'react-router-dom';
import { login } from './state/authSlice';
import { APP_ROUTES } from '@/common/constants/routing/routes';
import { Info } from '@mui/icons-material';
import { DUMMY_USER_DETAILS } from '@/common/constants/constants';

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
                navigate(APP_ROUTES.PROTECTED.DASHBOARD);
            } catch (err) {
                console.error(err);
            }
        }
    })
    return (
        <Box sx={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
            <Grow in timeout={1000}><Paper elevation={5} sx={{ p: 4 }} square={false}>
                <Container maxWidth="md" sx={{ minWidth: '500px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', placeItems: 'center', justifyContent: 'center', gap: 1 }}>
                        <Typography variant='h5' gutterBottom align='center'>Login</Typography>
                        <Tooltip title={<>
                            <Typography variant='body2' color="text.secondary">Use the following credentials to login:</Typography>
                            <br />
                            <Typography variant='body2' color="text.secondary">Username: {DUMMY_USER_DETAILS.username}</Typography>
                            <Typography variant='body2' color="text.secondary">Password: {DUMMY_USER_DETAILS.password}</Typography>
                        </>
                        }
                            placement="top"
                        >
                            <Info sx={{ cursor: 'pointer' }} />
                        </Tooltip>
                    </Box>
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
                        {error && <Typography variant='caption' color="error">{error}</Typography>}
                    </Box>
                </Container>
            </Paper></Grow>
        </Box>
    )
}

export default Login;