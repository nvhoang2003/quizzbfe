import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from '@/utils/snackbar-utils';
import SnackbarCloseButton from '@/components/snackbar/close-button';
import { store, persistor } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import '@/styles/globals.css';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>
              QuizzBank
            </title>
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <AuthProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarProvider
                  maxSnack={3}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  action={snackbarKey => <SnackbarCloseButton snackbarKey={snackbarKey} />}
                >
                  <SnackbarUtilsConfigurator />
                  <AuthConsumer>
                    {
                      (auth) => auth.isLoading
                        ? <SplashScreen />
                        : getLayout(<Component {...pageProps} />)
                    }
                  </AuthConsumer>
                </SnackbarProvider>
              </ThemeProvider>
            </AuthProvider>
          </LocalizationProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;







// import '@/styles/globals.css'

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }
