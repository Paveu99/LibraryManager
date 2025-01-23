import { useQuery } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { Rental } from '../../../../library-manager-back/types/index'
import { useUserStore } from "../../store/useUserStore";
import { useShallow } from "zustand/shallow";

export const useGetUserRentalsQuery = () => {
    const { apiGet } = useApi();
    const { id } = useUserStore(
        useShallow((state) => ({
            id: state.id,
        }))
    );

    const { data, refetch, error, isLoading } = useQuery({
        queryKey: ["rentals", id],
        queryFn: async () => {
            return apiGet<Rental[]>("rental/user", id)
        },
    })

    return {
        data,
        refetch,
        error,
        isLoading,
    }
}
