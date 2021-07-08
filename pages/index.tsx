import Link from 'next/link';
import { Layout } from '../components/Common/Layout';
import { ChevronRightIcon } from '@heroicons/react/solid';
import React, { useEffect, useState } from 'react';
import { IndexState } from '../types';

export default function Index() {
    const [state, setState] = useState<IndexState>({
        users: 0,
        snippets: 0,
        qa: 0,
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/mockCommunityStats');
                const data = await res.json();
                setState(data);
            } catch (error) {
                //handle error
            }
        };
        fetchData();
    }, []);

    const { users, snippets, qa } = state;
    return (
        <>
            <Layout>
                <main className="flex flex-col flex-grow items-center w-full text-center">
                    <div className="flex flex-row items-center justify-center xl:justify-between w-full flex-wrap-reverse mt-16">
                        <div className="max-w-max text-left mx-6 my-16">
                            <div className="text-2xl md:text-4xl font-bold">
                                Browse and create code snippets
                            </div>
                            <div className="mt-4 mb-8 md:text-lg">
                                Snippets are small pieces of code you don't need
                                to remember.
                            </div>
                            <Link href="/">
                                <button className="flex flex-row items-center bg-red-300 py-1 px-3 rounded text-black hover:bg-red-400">
                                    Checkout our example
                                    <ChevronRightIcon className="w-8 -mr-2" />
                                </button>
                            </Link>
                        </div>
                        <div
                            className="relative mx-6 my-4"
                            style={{ width: '500px', height: '280px' }}
                        >
                            <div className="bg-blue-300 w-full h-full absolute top-0 transform rotate-6 opacity-50"></div>
                            <div className="bg-red-300 w-full h-full absolute top-0 transform -rotate-6 opacity-50"></div>
                            <div className="bg-black w-full h-full absolute"></div>
                        </div>
                    </div>
                    <div className="mt-16">
                        <div className="text-2xl font-thin sm:my-8">
                            Community Stats
                        </div>
                        <div className="sm:flex sm:flex-row sm:flex-wrap">
                            <div className="sm:border-r sm:border-b-0 sm:px-16 sm:py-0 py-8 border-b max-w-max mx-auto">
                                <div className="text-2xl font-semibold">
                                    {users}
                                </div>
                                <div className="font-thin mt-2">Users</div>
                            </div>
                            <div className="sm:border-r sm:border-b-0 sm:px-16 sm:py-0 py-8 border-b max-w-max mx-auto">
                                <div className="text-2xl font-semibold">
                                    {snippets}
                                </div>
                                <div className="font-thin mt-2">Snippets</div>
                            </div>
                            <div className="sm:px-16 sm:py-0 py-8 max-w-max mx-auto">
                                <div className="text-2xl font-semibold">
                                    {qa}
                                </div>
                                <div className="font-thin mt-2">Q&A</div>
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    );
}
