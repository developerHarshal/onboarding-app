import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from '@/app/store';
import { ThemeProvider } from '@mui/material/styles';
import { RouterProvider } from 'react-router-dom';
import { Box } from '@mui/material';
import './index.css';
import theme from './theme';
import { PersistGate } from 'redux-persist/integration/react';
import { router } from '@routes/AppRoutes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading..</div>} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: (theme) => theme.palette.background.default,
          }}
        >
          <RouterProvider router={router} />
        </Box>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);



