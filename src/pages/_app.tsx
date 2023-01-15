import { useEffect } from 'react';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { onAuthStateChangedListener } from '../../utils/firebase/firebase.utils';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
