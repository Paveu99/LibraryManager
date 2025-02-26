import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Book } from '../../../../library-manager-back/types/index'
import { useUserStore } from "../../store/useUserStore";
import { useShallow } from "zustand/shallow";

export const useGetBooksQuery = () => {

    const { id } = useUserStore(
        useShallow((state) => ({
            id: state.id,
        }))
    );

    const { apiGet } = useApi();
    const { data, refetch, error, isLoading } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            return apiGet<Book[]>("book", id)
        },
    })

    return {
        data,
        refetch,
        error,
        isLoading,
    }
}
