import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { useUserStore } from "../../store/useUserStore";
import { useShallow } from "zustand/shallow";

export const useGetUserStatsQuery = () => {
    const { apiGet } = useApi();
    const { id } = useUserStore(
        useShallow((state) => ({
            id: state.id,
        }))
    );

    const { data, refetch, error, isLoading } = useQuery({
        queryKey: ["mainstats", id],
        queryFn: async () => {
            return apiGet<{ status: string; count: number }[]>("rental/stats", id)
        },
    })

    return {
        data,
        refetch,
        error,
        isLoading,
    }
}
