"use client"

import { useState } from "react"

import {
    QueryClient,
    QueryClientProvider,
} from "@tanstack/react-query"

export const client = new QueryClient();

export const QueryProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    // const [queryClient] = useState(() => new QueryClient())
    const [queryClient] = useState(() => client)

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}