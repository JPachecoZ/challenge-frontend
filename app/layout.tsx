'use client'

import { Inter } from "next/font/google";
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import "./globals.css";
import { AuthProvider } from "@/libs/auth";

const inter = Inter({ subsets: ["latin"] });

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ApolloProvider client={client}>
        <AuthProvider>
          <html lang="en">
              <body className={inter.className}>
                {children}
              </body>
          </html>
        </AuthProvider>
      </ApolloProvider>
  );
}
