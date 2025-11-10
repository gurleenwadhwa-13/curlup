"use client"
import type { IApiResponse } from "@/types/request.types";

export interface ResponsePanelProps {
  response: IApiResponse | null
  error: string | null
}

export function ResponsePanel({response, error} : ResponsePanelProps) {
    return (
        <div className="">
        </div>
     );
}