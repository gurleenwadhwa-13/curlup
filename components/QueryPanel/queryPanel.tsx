"use client";

import { useEffect, useState } from "react";
import { IApiRequest, RequestMethods } from "@/types/request.types";
import { ChevronDown, ChevronUp, Plus, Send, X } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Card, CardContent, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAPIRequest } from "@/hooks/useAPIRequest";

export function QueryPanel() {
  const [requestCallMethod, setRequestCallMethod] = useState<IApiRequest["method"]>("GET");
  const [requestURL, setReqestURL] = useState<string>(
    "https://api.github.com/users/octocat",
  );
  const [requestBody, setRequestBody] = useState<string>("");
  const [requestHeaders, setRequestHeaders] = useState<Array<{ key: string; value: string }>>([]);
  const [bodyOpen, setBodyOpen] = useState<boolean>(false);
  const [headersOpen, setHeadersOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  // compute headersObj BEFORE calling useAPIRequest
  const headersObj = Object.fromEntries(
    requestHeaders
      .filter(({ key }) => key.trim() !== "") // drop empty keys
      .map(({ key, value }) => [key, value as string])
  );

  // safe parse for JSON body (avoid runtime crash if invalid JSON)
  const parsedBody = (() => {
    if (!requestBody) return undefined;
    try {
      return JSON.parse(requestBody);
    } catch {
      // fallback: send raw string or undefined depending on your API expectations
      return requestBody;
    }
  })();

  const { data, refetch, mutate, isFetching, mutateReponseData, mutateStatePending } = useAPIRequest({
    url: requestURL,
    method: requestCallMethod,
    headers: headersObj,
    body: parsedBody,
    enabled: false
  })

  /**Event Handlers for Headers */
  const handleAddHeaders = () => {
    setRequestHeaders([...requestHeaders, { key: "", value: "" }]);
  };

  const handleUpdateHeaders = (
    id: number,
    field: "key" | "value",
    value: string,
  ) => {
    const newHeaders = [...requestHeaders];
    newHeaders[id][field] = value;
    setRequestHeaders(newHeaders);
  };

  const handleDeleteHeaders = (id: number) => {
    setRequestHeaders(requestHeaders.filter((_, i) => i !== id))
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestCallMethod === "GET") refetch();
    mutate();
  };

  return (
    <>
      <div className="flex flex-col gap-4 overflow-y-auto">
        <Card className="bg-card  border-[#3B82F6]/20 rounded-xl p-3">
          {/*Title*/}
          <CardTitle className="font-bold text-xl px-1.5">
            New Request
          </CardTitle>

          <CardContent className="px-1.5">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-row">
                {/*Method Heading*/}
                <Label className="flex flex-wrap px-2" htmlFor="method">
                  Method
                </Label>

                {/*Method Select DropDown*/}
                <Select
                  value={requestCallMethod}
                  onValueChange={(method) =>
                    setRequestCallMethod(method as RequestMethods)
                  }
                >
                  <SelectTrigger className="w-[150px] mx-2" id="method">
                    <SelectValue placeholder="Select Method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>

                {/*URL Input Box*/}
                <Input
                  value={requestURL}
                  onChange={(e) => setReqestURL(e.target.value)}
                  className="font-mono text-sm"
                  placeholder="Enter URL"
                  type="url"
                />
              </div>

              <div className="flex flex-col py-1.5">
                {requestCallMethod === "POST" && (
                  <Collapsible
                    open={bodyOpen}
                    onOpenChange={setBodyOpen}
                    className="flex w-[350px] flex-col gap-2"
                  >
                    <CollapsibleTrigger className="flex flex-row font-sans text-gray-500 mt-5 text-sm">
                      {bodyOpen ? <ChevronUp /> : <ChevronDown />}
                      <span>Request Body (JSON)</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Textarea
                        value={requestBody}
                        onChange={(e) => setRequestBody(e.target.value)}
                        className="text-sm font-mono min-h-[120px]"
                        placeholder='{"key": "value}'
                      />
                    </CollapsibleContent>
                  </Collapsible>
                )}

                <Collapsible
                  open={headersOpen}
                  onOpenChange={setHeadersOpen}
                  className="flex w-[350] flex-col gap-2"
                >
                  <div className="flex flex-col gap-2">
                    <CollapsibleTrigger className="flex flex-row font-sans text-gray-500 mt-5 text-sm">
                      {headersOpen ? <ChevronUp /> : <ChevronDown />}
                      <span>Headers (Optional)</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="flex flex-col gap-2">
                      <div className="flex flex-col gap-0">
                        {requestHeaders.map((header, id) => (
                          <div key={id} className="flex gap-1">
                            <Input
                              value={header.key}
                              placeholder="Key"
                              className="flex-1 font-mono text-md"
                              onChange={(e) =>
                                handleUpdateHeaders(id, "key", e.target.value)
                              }
                            />

                            <Input
                              value={header.value}
                              placeholder="Value"
                              className="flex-1 font-mono text-sm mx-2"
                              onChange={(e) =>
                                handleUpdateHeaders(id, "value", e.target.value)
                              }
                            />

                            <Button
                              type="button"
                              variant="destructive"
                              className="h-9 w-10 mr-2"
                              onClick={() => handleDeleteHeaders(id)}
                            >
                              <X />
                            </Button>
                          </div>
                        ))}
                      </div>

                    <div className="flex flex-col">
                      <Button
                        variant="default"
                        type="button"
                        onClick={handleAddHeaders}
                      >
                        <Plus />
                        Add Header
                      </Button>
                    </div>
                  </CollapsibleContent>
                  </div>
                </Collapsible>
              </div>

              <Button
                variant="default"
                type="submit"
                className="w-full bg-primary mx-auto mb-5"
                disabled={isFetching || mutateStatePending}
              >
                <Send className="w-4 h-4 mr-2" />
                {(isFetching || mutateStatePending) ? "Sending..." : "Send Request"}
              </Button>

              {(data || mutateReponseData)  && (
                <div className="mt-4 bg-gray-100 p-2 text-mono text-black rounded overflow-x-auto">
                  {JSON.stringify(data, null, 2)} {JSON.stringify(mutateReponseData, null, 2)}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
