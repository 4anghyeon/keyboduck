import Footer from '@/components/layout/footer/Footer';
import NavBar from '@/components/layout/navbar/NavBar';
import '@/styles/globals.css';
import type {AppProps} from 'next/app';

export default function App({Component, pageProps}: AppProps) {
  return (
    <div>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
