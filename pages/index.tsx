import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Home() {
    return (
        <div className="min-h-screen max-w-4xl py-2 mx-auto">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="grid grid-cols-12 grid-rows-3 font-thin">
                <div className="col-span-2">
                    <div className="text-4xl font-thin">Code</div>
                    <div className="text-lg -mt-3 ml-5 font-thin">snippets</div>
                </div>
                <div className="flex flex-row font-thin text-lg col-span-8 items-center">
                    <div className="pr-4">
                        <Link href="/">Browser</Link>
                    </div>
                    <div className="pr-4">
                        <Link href="/">Search</Link>
                    </div>
                    <div className="pr-4">
                        <Link href="/">Q & A</Link>
                    </div>
                </div>
                <div className="flex flex-row items-center text-lg col-span-2 justify-self-end">
                    <div className="mr-8">Jessica A.</div>
                    <div className="w-6">
                        <svg
                            viewBox="0 0 100 100"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx="50" cy="50" r="50" />
                        </svg>
                    </div>
                </div>
            </header>
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center"></main>

            <footer className="flex items-center justify-center w-full h-24 border-t"></footer>
        </div>
    );
}
