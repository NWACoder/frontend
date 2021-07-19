import React, {
    useState,
    useContext,
    createContext,
    ReactNode,
    useEffect,
} from 'react';
import jwt_decode from 'jwt-decode';
import { nonAuthAxios } from '../axios';
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
    signup: (
        email: string,
        password: string,
        username: string
    ) => Promise<void | { error: string }>;
    signout: () => void;
    isLoaded: boolean;
}

const authContext = createContext<AuthContext | undefined>(undefined);

export function ProvideAuth({ children }: { children: ReactNode }) {
    const auth = useProvideAuth(children);
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(authContext);
    if (context === undefined) {
        throw new Error('useAuth must be within AuthProvider');
    }
    return context;
};

function useProvideAuth(children: React.ReactNode) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        const user = getUserFromLocalToken();
        if (!user) {
            signout();
        } else {
            setUser(user);
        }
    }, [children]);

    const getUserFromLocalToken = (): User | null => {
        const token = localStorage.getItem('codeParcelUserToken');
        try {
            if (!token) return null;
            const user = jwt_decode(token) as User;
            if (new Date().valueOf() / 1000 > user.exp) return null;
            return user;
        } catch (error) {
            return null;
        }
    };

    const signin = async (username: string, password: string) => {
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
            return { error: 'Invalid username or password' };
        }
    };
    const signup = async (
        email: string,
        password: string,
        username: string
    ) => {
        try {
            const res = await nonAuthAxios().post('/auth/register', {
                username,
                password,
                email,
            });
            if (res.status === 201) {
                const error = await signin(username, password);
                if (!error) return;
            }
            throw new Error();
        } catch (error) {
            return { error: 'Error signing up, try again later' };
        }
    };
    const signout = () => {
        localStorage.removeItem('codeParcelUserToken');
        setUser(null);
    };

    return {
        user,
        isLoaded,
        signin,
        signup,
        signout,
    };
}
