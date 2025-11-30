import type { IApiResponse } from "@/types/request.types";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Suspense } from "react";

interface ResponsePanelProps {
  response: {
    data: any;
    isLoading: boolean;
    error?: Error | null;
  };
}

export function ResponsePanel({ response }: ResponsePanelProps ) {
  const { data, isLoading, error} = response

  return (
      <div className="flex flex-col mx-auto max-w-[500px] overflow-y-auto">
        <Card className="min-w-[350px] bg-card  border-[#3B82F6]/20 rounded-xl p-3">
          <CardTitle className="font-bold font-sans text-xl px-1.5">Response</CardTitle>
          <CardContent className="min-w-[350px] px-1.5">
            <div>

            </div>

            {/* When Data is being fetched or API response has ben received. */}
            <div className="container mt-3 bg-gray-100 text-mono text-sm text-black rounded overflow-x-auto">
              <Suspense fallback={<div>Loading...</div>}>
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </Suspense>
            </div>

            {/* Handling Errors */}
            {error && (
              <div>There was an error in fetching the data. Kindly check check back later</div>
            )}
          </CardContent>
        </Card>
      </div>
    );
}