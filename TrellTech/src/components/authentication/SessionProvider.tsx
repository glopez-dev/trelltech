import React from 'react';
import { useStorageState } from './useStorageState';

const AuthContext = React.createContext<{
    signIn: () => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
}>
({
   signIn: () => {
    null
   },
   signOut: () => {
    null
   },
   session: null,
   isLoading: false, 
});

/**
 * Custom hook to retrieve the session information.
 *
 * @return {object} The session information retrieved from the context.
 * 
 * @throws {Error} If the context is not provided.
 * 
 * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
 */
export function useSession() {
    const value = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== 'production') {
        if (!value) {
            throw new Error('useSession must be used within a AuthProvider');
        }
    }
    return value;
}

/**
 * Session provider component for managing user session state.
 *
 * @param {React.PropsWithChildren} props - The properties and children for the component.
 * @return {JSX.Element} The provider component with authentication context.
 * 
 * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
 */
export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext.Provider
            value={{
                signIn: () => {
                    setSession('xxx');
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}>
                {props.children}
            </AuthContext.Provider>
    );
}