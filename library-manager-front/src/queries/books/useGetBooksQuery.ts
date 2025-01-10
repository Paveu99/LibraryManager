import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Book } from '../../../../library-manager-back/types/index'

export const useGetBooksQuery = () => {
    const { apiGet } = useApi();
    const { data, refetch, error, isLoading } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            return apiGet<Book[]>("book")
        },
    })

    return {
        data,
        refetch,
        error,
        isLoading,
    }
}
