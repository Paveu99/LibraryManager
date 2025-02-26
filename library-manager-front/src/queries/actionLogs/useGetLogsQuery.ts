import { useQuery } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi"
import { Log } from "../../../../library-manager-back/types";
import { useUserStore } from "../../store/useUserStore";
import { useShallow } from "zustand/shallow";

export const useGetLogsQuery = () => {
    const { apiGet } = useApi();
    const { id } = useUserStore(
        useShallow((state) => ({
            id: state.id,
        }))
    );

    const { data, refetch, error, isLoading } = useQuery({
        queryKey: ["logs"],
        queryFn: async () => {
            return apiGet<Log[]>("logs", id)
        },
    })

    return {
        data,
        refetch,
        error,
        isLoading,
    }
}