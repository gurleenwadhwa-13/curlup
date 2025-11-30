"use client"

import {useState} from "react";
import {QueryPanel} from "@/components/QueryPanel/queryPanel";
import {ResponsePanel} from "@/components/ResponsePanel/responsePanel";

export function MainContainer() {
    const [response, setResponse] = useState<{
        data: any,
        isLoading: boolean,
        error?: Error | null
    }>({
        data: null,
        isLoading: false,
        error: null
    })

    return (
        <>
            <main className="flex-1 container mx-auto py-4">
                <div className="grid grid-cols-1 lg:grid-cols-[50%_50%] gap-4 h-[calc(100vh-160px)]">
                    <QueryPanel responseCallback = {setResponse} />
                    <ResponsePanel response = {response} />
                </div>
            </main>
        </>
    )
}

