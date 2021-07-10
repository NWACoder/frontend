import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../lib/context/useAuth';
import { Modal } from './Modal';

export const LoginModal = ({ handleClose }: { handleClose: () => void }) => {
    const router = useRouter();
    const auth = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const error = await auth.signin(username, password);
        if (!error) {
            handleClose();
            router.push('/user/dashboard');
        } else {
            setError(error.error);
        }
    };

    return (
        <Modal
            title="Login"
            closeHandler={handleClose}
            // loadingOverlay={
            //     loading && (
            //         <LoadingOverlay>
            //             <div className="text-4xl mb-2">Logging In</div>
            //             <LoadingBar />
            //         </LoadingOverlay>
            //     )
            // }
        >
            <div className="px-6">
                <span className="text-red-600 font-semibold">{error}</span>
                <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
                    <label className="block">
                        <span className="text-lg font-semibold">Username</span>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            className="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </label>
                    <label className="block">
                        <span className="text-lg font-semibold">Password</span>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            className="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                            minLength={4}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </label>
                    <div className="flex flew-row justify-center mb-4">
                        <button
                            className="focus:outline-none bg-blue-400 hover:bg-blue-500 rounded-md py-2 px-3 w-48"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};
