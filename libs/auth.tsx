"use client"

import { createContext, useContext, useState } from 'react';
import { User } from '../models/user.model';
import { getUser } from '@/services/auth.service';

const AuthContext = createContext({ user: null as User | null, handleUser: (user: User | null) => {}});

export function AuthProvider({ children } : {children : React.ReactNode}){
    const [user, setUser] = useState(getUser);

    function handleUser(newUser: User | null){
        console.log('handling user in the context...')
        setUser(newUser)
    }

    return (
        <AuthContext.Provider value={{ user, handleUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}