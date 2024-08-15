// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import '@/app/globals.css';
import { ReactNode } from 'react';
import Navbar from '@/components/ui/navbar';

//wagmi related imports
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { config } from '@/utils/wagmi/web3';
import { Connect } from '@/components/ui/Connect';
import Web3ModalProvider from '@/context/web3';

const fontHeading = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
});

const fontBody = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export default function Layout({ children }: { children: ReactNode }) {
  const initialState = cookieToInitialState(config, headers().get('cookie'));
  return (
    <html lang="en">
      <body
        className={cn('antialiased', fontHeading.variable, fontBody.variable)}
      >
        <Navbar />
        <Web3ModalProvider initialState={initialState}>
          {children}
        </Web3ModalProvider>
        {/* {children} */}
      </body>
    </html>
  );
}
