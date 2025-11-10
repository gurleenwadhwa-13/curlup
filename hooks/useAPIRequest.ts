import { IApiRequest  } from "@/types/request.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useAPIRequest({ url, method, headers, body, enabled }: IApiRequest) {

    const queryClient = useQueryClient();

    async function getRequest () {
        const response = await axios.get(url, { headers: headers})
        if ( response.status!== 200) {
            throw new Error(`Cannot fetch data from ${url}`);
        }
        return response.data;
    }

    async function postRequest () {
        const response = await axios.post(url, { headers: headers, body: body })
        if ( response.status!== 200) {
            throw new Error(`Cannot fetch data from ${url}`);
        }
        return response.data;
    }

    async function putRequest () {
        const response = await axios.put(url, { headers: headers, body: body })
        if ( response.status!== 200) {
            throw new Error(`Cannot fetch data from ${url}`);
        }
        return response.data;
    }


    async function deleteRequest () {
        const response = await axios.delete(url, { headers: headers })
        if ( response.status!== 200) {
            throw new Error(`Cannot fetch data from ${url}`);
        }
        return response.data;
    }


    const { data, refetch, isError, error, isFetching } = useQuery({
        queryKey: ['get_request_api_call', url],
        queryFn: getRequest,
        enabled,
    })

    const { mutate, data:mutateReponseData, isPending:mutateStatePending } = useMutation({
        mutationFn: async (data) => {
          switch (method) {
            case "POST": return postRequest();
            case "PUT": return putRequest();
            case "DELETE": return deleteRequest();
            default: throw new Error(`Unsupported method: ${method}`);
          }
        },
        onSuccess: () => queryClient.invalidateQueries()
    })

    return {
        data,
        mutateReponseData,
        mutateStatePending,
        mutate,
        refetch,
        isError,
        error,
        isFetching
    }

}
