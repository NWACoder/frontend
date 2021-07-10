import React, {
    useState,
    useContext,
    createContext,
    ReactNode,
    useEffect,
} from 'react';
import jwt_decode from 'jwt-decode';
import { authAxios, nonAuthAxios } from '../axios';
export interface User {
    username: string;
    sub: string;
    iat: number;
    exp: number;
}
interface AuthContext {
    user: User | null;
    signin: (
        email: string,
        password: string
    ) => Promise<void | { error: string }>;
    signup: (email: string, password: string) => Promise<void>;
    signout: () => void;
}

const authContext = createContext<AuthContext | undefined>(undefined);

export function ProvideAuth({ children }: { children: ReactNode }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(authContext);
    if (context === undefined) {
        throw new Error('useAuth must be within AuthProvider');
    }
    return context;
};

function useProvideAuth() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('codeParcelUserToken');
        if (token !== null) {
            try {
                const user = jwt_decode(token) as User;
                setUser(user);
            } catch (error) {
                return;
            }
        }
    }, []);

    const signin = async (username: string, password: string) => {
        // TODO Handle Error
        try {
            const res = await nonAuthAxios().post('/auth/login', {
                username,
                password,
            });
            const data = res.data;
            if (data && data.access_token) {
                try {
                    const user = jwt_decode(data.access_token) as User;
                    localStorage.setItem(
                        'codeParcelUserToken',
                        data.access_token
                    );
                    setUser(user);
                } catch (error) {
                    return { error: 'Unable to login, try again later' };
                }
            }
        } catch (error) {
            console.log(error.message);
            return { error: 'Invalid username or password' };
        }
    };
    const signup = async (_email: string, _password: string) => {
        // TODO Signup and Receive Token
        // TODO Handle Error
        const token = 'testToken';
        localStorage.setItem('codeParcelUserToken', token);
        // setUser({ token });
        return;
    };
    const signout = () => {
        localStorage.removeItem('codeParcelUserToken');
        setUser(null);
    };

    return {
        user,
        signin,
        signup,
        signout,
    };
}
