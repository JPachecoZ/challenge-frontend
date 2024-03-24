"use client"

import { FormEventHandler, useState } from "react";
import { login } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/auth.context";

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
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">
                            Email
                        </label>
                        <div className="control">
                            <input className="input" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            Password
                        </label>
                        <div className="control">
                            <input className="input" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                    </div>
                    {error && (
                        <div className="message is-danger">
                            <p className="message-body">
                                Login-failed
                            </p>
                        </div>
                    )}
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-link">
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </main>
    );
}