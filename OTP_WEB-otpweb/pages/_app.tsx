import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5c0931'
    }
  }
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>


      <Component {...pageProps} />

    </ThemeProvider>
  )
}
