'use client'

import { User } from "@/models/user.model";
import { JwtPayload, jwtDecode } from "jwt-decode";

export function getAccessToken(){
    return localStorage.getItem(process.env.ACCESS_TOKEN_KEY!);
}

export async function login(email: string, password:string){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOGIN_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok){
        return null;
    }
    const { token } = await response.json()
    localStorage.setItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY!, token)
    return getUserFromToken(token)
}

export function logout(){
    localStorage.removeItem(process.env.ACCESS_TOKEN_KEY!)
}

function getUserFromToken(token:string){
    const claims: JwtPayload & {email: string} = jwtDecode(token)
    return {
        id: claims.sub!,
        email: claims.email,
    }
}

export function getUser(): User | null {
    const token = getAccessToken();
    if (!token) {
      return null;
    }
    return getUserFromToken(token);
  }