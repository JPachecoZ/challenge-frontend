"use client"

import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { TextField, Box, Button } from "@mui/material";

import { login } from "@/services/auth.service";
import { useAuth } from "@/libs/auth";

export default function LoginPage(){
    const router = useRouter();
    let { handleUser } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit: FormEventHandler = async (event) => {
        event.preventDefault();
        setError(false)
        const user = await login(email, password);

        if (user){
            handleUser(user);
            router.push('/');
        } else {
            setError(true);
            router.refresh();
        }
    }

    return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-white">
                <Box className="flex flex-col" component="form" onSubmit={handleSubmit} sx={{'& .MuiTextField-root': {m:1, width: '25ch'}}} noValidate autoComplete="off">
                    <TextField label="Email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <TextField label="Password" type="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                    
                    {error && (
                        <p className="text-red-500 text-center">
                            Login-failed
                        </p>
                    )}
                    <Button type="submit" variant="contained">Login</Button>
                </Box>
            </main>
    );
}