import { IApiRequest  } from "@/types/request.types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useAPIRequest({ url, method, headers, body, enabled }: IApiRequest) {
    const queryClient = useQueryClient();

    async function getRequest () {
        const response = await axios.get(url, { headers: headers})
        if ( response.status!== 200 ) {
            throw new Error(`Cannot fetch data from ${url}`);
        }
        return response.data;
    }

    async function postRequest () {
        const response = await axios.post(url, body, { headers: headers })
        if ( response.status!== 200 ) {
            throw new Error(`Cannot fetch data from ${url}`);
        }
        return response.data;
    }

    async function putRequest () {
        const response = await axios.put(url, body , { headers: headers })
        if ( response.status!== 200 ) {
            throw new Error(`Cannot fetch data from ${url}`);
        }
        return response.data;
    }

    async function deleteRequest () {
        const response = await axios.delete(url, { headers: headers })
        if ( response.status!== 200  ) {
            throw new Error(`Cannot fetch data from ${url}`);
        }
        return response.data;
    }

    const { data, refetch, error: queryError, isFetching } = useQuery({
        queryKey: ['get_request_api_call', url],
        queryFn: getRequest,
        enabled,
    })

    const { mutate, data:mutateResponseData, isPending:mutateStatePending, error: mutateStateError } = useMutation({
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
        mutateResponseData,
        mutateStatePending,
        mutateStateError,
        mutate,
        refetch,
        queryError,
        isFetching
    }

}
