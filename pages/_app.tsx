import { AppProps } from 'next/app';
import { ProvideAuth } from '../lib/context/useAuth';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ProvideAuth>
            <Component {...pageProps} />
        </ProvideAuth>
    );
}

export default MyApp;
