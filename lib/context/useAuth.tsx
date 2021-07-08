import React, {
    useState,
    useContext,
    createContext,
    ReactNode,
    useEffect,
} from 'react';
export interface User {
    token: string;
}
interface AuthContext {
    user: User | null;
    signin: (email: string, password: string) => Promise<User>;
    signup: (email: string, password: string) => Promise<User>;
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
        // TODO Decode and Validate Token
        if (token !== null) {
            const user = { token };
            setUser(user);
        }
    }, []);

    const signin = async (email: string, password: string) => {
        // Signin
        // TODO Authenticate User
        // TODO Handle Error
        const token = 'testToken';
        localStorage.setItem('codeParcelUserToken', token);
        setUser({ token });
        return { token };
    };
    const signup = async (email: string, password: string) => {
        // TODO Signup and Receive Token
        // TODO Handle Error
        const token = 'testToken';
        localStorage.setItem('codeParcelUserToken', token);
        setUser({ token });
        return { token };
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
