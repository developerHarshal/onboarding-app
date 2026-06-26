import { Card, Container, Paper, Typography } from '@mui/material'
import { useAppSelector } from '@/app/hook'

const Dashboard = () => {
    const { user } = useAppSelector((state) => state.auth);
    return (
        <Container maxWidth="md" >
            <Paper elevation={3} >
                <Card sx={{ minHeight: '200px', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography gutterBottom variant='h4'>Welcome {user.name}</Typography>
                    <Typography variant='body1'>Your Onboarding is completed!</Typography>
                </Card>
            </Paper>
        </Container>
    )
}

export default Dashboard