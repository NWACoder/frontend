import { ChevronDownIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import React, { ReactEventHandler, useState } from 'react';
import { useAuth } from '../../lib/context/useAuth';

export const Header = ({
    handleLogin,
    handleSignup,
}: {
    handleLogin: ReactEventHandler;
    handleSignup: ReactEventHandler;
}) => {
    const auth = useAuth();

    const { user } = auth;

    const navItems = [
        { path: 'snippets', name: 'Browse' },
        { path: 'search', name: 'Search' },
        { path: 'challenges', name: 'Challenges' },
    ];

    const nav = navItems.map((item) => {
        return (
            <Link href={item.path} key={item.name}>
                <button className="px-6 py-2 hover:bg-gray-200 rounded font-thin text-lg">
                    {item.name}
                </button>
            </Link>
        );
    });

    return (
        <header className="flex flex-row font-thin flex-wrap">
            <div className="mr-8">
                <div className="text-4xl font-thin">Code</div>
                <div className="text-lg -mt-3 ml-5 font-thin">snippets</div>
            </div>
            <div className="flex flex-row items-center sm:flex-grow whitespace-nowrap mx-auto">
                {nav}
            </div>
            <div className="flex flex-row items-center text-lg mx-auto my-2">
                {user ? (
                    <UserNav username={user.username} />
                ) : (
                    <NonUserNav
                        handleLogin={handleLogin}
                        handleSignup={handleSignup}
                    />
                )}
            </div>
        </header>
    );
};

const NonUserNav = ({
    handleLogin,
    handleSignup,
}: {
    handleLogin: ReactEventHandler;
    handleSignup: ReactEventHandler;
}) => {
    return (
        <div>
            <button
                className="px-4 py-1 bg-gray-700 hover:bg-gray-900 rounded mx-4 text-white"
                onClick={handleSignup}
            >
                Signup
            </button>
            <button
                className="px-4 py-1 bg-gray-700 hover:bg-gray-900 rounded mx-4 text-white"
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    );
};

const UserNav = ({ username }: { username: string }) => {
    const auth = useAuth();
    const [active, setActive] = useState(false);

    const handleLogout = () => {
        auth.signout();
        setActive(false);
    };

    return (
        <div className="relative">
            <button
                className={`flex flex-row border border-transparent items-center py-1 px-6 rounded hover:bg-gray-200 font-thin text-lg ${
                    active && 'border-gray-200'
                }`}
                onClick={() => setActive((state) => !state)}
            >
                <div className="mr-4">{username}</div>
                <div className="w-6">
                    <ChevronDownIcon className="w-8 -mr-2" />
                </div>
            </button>
            {active && (
                <div className="absolute w-full border border-t-0 rounded bg-white z-10">
                    <Link href="/user/dashboard">
                        <button className="py-2 w-full hover:bg-gray-200 font-thin text-lg text-left px-3">
                            Dashboard
                        </button>
                    </Link>
                    <button
                        className="py-2 w-full hover:bg-gray-200 font-thin text-lg text-left px-3"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};
