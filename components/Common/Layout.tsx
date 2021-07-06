import Head from 'next/head';
import React from 'react';
import { Header } from './Header';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen max-w-4xl py-2 mx-auto">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <Header />
            {children}
            <footer className="flex items-center justify-center w-full h-4 border-t mt-16"></footer>
        </div>
    );
};
