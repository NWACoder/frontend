import React, { FormEvent, ReactEventHandler, useState } from 'react';
import { useAuth } from '../../lib/context/useAuth';
import { Modal } from './Modal';

export const LoginModal = ({ handleClose }: { handleClose: () => void }) => {
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = await auth.signin(email, password);
        if (user !== null) {
            handleClose();
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
            <div className="px-6 py-2">
                <form className="grid grid-cols-1 gap-6" onSubmit={handleLogin}>
                    <label className="block">
                        <span className="text-lg font-semibold">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            className="border-gray-300 mt-1 block w-full rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                            onChange={({ target }) => setEmail(target.value)}
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
                            minLength={6}
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
