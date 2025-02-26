import { useQuery } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi";
import { useUserStore } from "../../store/useUserStore";
import { useShallow } from "zustand/shallow";

export const useGetPreciseUserStatsQuery = <T>(year?: number, month?: number) => {
    const { apiGet } = useApi();
    const { id: userId } = useUserStore(
        useShallow((state) => ({
            id: state.id,
        }))
    );

    const { data, refetch, error, isLoading } = useQuery({
        queryKey: ["userstats", userId, year, month],
        queryFn: async () => {
            const queryParams = new URLSearchParams();
            if (year) queryParams.append("year", year.toString());
            if (month) queryParams.append("month", month.toString());

            return apiGet<T>(`rental/user_stats?${queryParams.toString()}`, userId);
        },
    });

    return {
        data,
        refetch,
        error,
        isLoading,
    };
};
