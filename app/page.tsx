"use client"

import { AuthProvider, useAuth } from "@/contexts/auth.context";
import { redirect } from "next/navigation";

export default function Home() {
  let { user, handleUser } = useAuth();
  console.log("Trying to load home page",user)

  const handleLogout = () => {
    handleUser(null);
    redirect('/login')
  }

  
  if(user){
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <h1 className="text-4xl font-bold">Hello, {user.name}!</h1>
          <button onClick={handleLogout} className="button">Logout</button>
        </main>
    )
  }

  redirect('/login')
}
