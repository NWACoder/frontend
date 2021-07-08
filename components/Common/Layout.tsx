import Head from 'next/head';
import React, { useState } from 'react';
import { Header } from './Header';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [loginModal, setLoginModal] = useState<boolean>(false);
    const [signupModal, setSignupModal] = useState<boolean>(false);
    return (
        <div className="relative min-h-screen py-2">
            <div className="container flex flex-col min-h-full mx-auto">
                <Head>
                    <title>Create Next App</title>
                    <link rel="icon" href="/favicon.ico" />
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="true"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <Header
                    handleLogin={() => setLoginModal(true)}
                    handleSignup={() => setSignupModal(true)}
                />
                {children}
                <footer className="flex items-center justify-center w-full h-4 border-t mt-16"></footer>
            </div>
            {loginModal && (
                <LoginModal handleClose={() => setLoginModal(false)} />
            )}
            {signupModal && (
                <SignupModal handleClose={() => setSignupModal(false)} />
            )}
        </div>
    );
};
