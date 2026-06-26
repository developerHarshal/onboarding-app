import { Card, Container, Grow, Paper, Typography } from '@mui/material'
import { useAppSelector } from '@/app/hook'
import NavBar from '@components/navbar';

const Dashboard = () => {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <>
            <Container sx={{ mt: 0, height: '100vh' }}>
                <NavBar />
                <Grow in timeout={500}>
                    <Container maxWidth="md" sx={{ marginTop: '200px' }} >
                        <Paper elevation={3} >
                            <Card sx={{ minHeight: '200px', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Typography gutterBottom variant='h4'>Welcome {user?.name}</Typography>
                                <Typography variant='body1'>Your Onboarding is completed!</Typography>
                            </Card>
                        </Paper>
                    </Container>
                </Grow>
            </Container>
        </>
    )
}

export default Dashboard