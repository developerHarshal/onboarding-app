import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from '@/app/hook';
import { logout } from '@/modules/auth/login/state/authSlice';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/common/constants/routing/routes';

export default function NavBar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onLogoutClick = () => {
        dispatch(logout());
        navigate(APP_ROUTES.PUBLIC.LOGIN);
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Onboarding App
                    </Typography>
                    <Button color="inherit" onClick={onLogoutClick}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
