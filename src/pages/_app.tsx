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
import {Provider} from 'react-redux';
import store from '@/redux/store';

export const queryClient = new QueryClient();

const DESCRIPTION =
  '다양한 브랜드의 키보드 정보, 리뷰, 평가, 등을 제공하는 사이트입니다. 사용자는 키보드의 종류, 가격, 특징, 디자인, 타건감 등을 한눈에 비교하고, 리뷰를 통해 실제 사용자들의 평가를 확인할 수 있습니다. 또한, 키보드 소리를 들을 수 있는 영상을 제공하여, 키보드의 타건감을 미리 경험할 수 있습니다.';
const IMAGE =
  'https://opengraph.b-cdn.net/production/documents/13f31b2e-429c-4ce0-bf9c-9ad176e44dfe.png?token=FNXrw6otw67pRo5PDGTR1lQuGWKACwhOMOUSMP8DQQU&height=630&width=1200&expires=33240168454';
const URL = 'https://keyboduck.vercel.app/';
const TITLE = 'Keyboduck - 당신의 키보드를 찾아보세요';

export default function App({Component, pageProps}: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>{makeTitle('')}</title>
          <meta property="description" content={DESCRIPTION} />
          <meta property={'og:url'} content={URL} />
          <meta property={'og:type'} content={'website'} />
          <meta property={'og:title'} content={TITLE} />
          <meta property={'og:description'} content={DESCRIPTION} />
          <meta property={'og:image'} content={IMAGE} />

          <meta name={'twitter:card'} content="summary_large_image" />
          <meta property={'twitter:domain'} content={'keyboduck.vercel.app'} />
          <meta property={'twitter:url'} content={URL} />
          <meta property={'twitter:title'} content={TITLE} />
          <meta property={'twitter:description'} content={DESCRIPTION} />
          <meta property={'twitter:image'} content={IMAGE} />
        </Head>
        <NavBar />
        <main>
          <Component {...pageProps} />
        </main>
        <ToastContainer />
        <Footer />
      </QueryClientProvider>
    </Provider>
  );
}
