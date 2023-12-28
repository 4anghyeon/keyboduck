import Footer from '@/components/layout/footer/Footer';
import NavBar from '@/components/layout/navbar/NavBar';
import '@/styles/globals.css';
import type {AppProps} from 'next/app';
import {QueryClient} from '@tanstack/query-core';
import {QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import {makeTitle} from '@/shared/helper';

export const queryClient = new QueryClient();

export default function App({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>{makeTitle('')}</title>
      </Head>
      <NavBar />
      <Component {...pageProps} />
      <ToastContainer />
      <Footer />
    </QueryClientProvider>
  );
}
