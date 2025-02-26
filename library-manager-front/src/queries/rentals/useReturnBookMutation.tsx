import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { useUserStore } from "../../store/useUserStore";
import { useShallow } from "zustand/shallow";

export const useReturnBookMutation = () => {
    const { apiPost } = useApi();
    const { id } = useUserStore(
        useShallow((state) => ({
            id: state.id,
        }))
    );
    const queryClient = useQueryClient();

    const { mutate, isPending, isSuccess, isError, error } = useMutation({
        mutationFn: async (rentalId: number) => {
            return apiPost("rental/return", { rentalId }, id);
        },
        onSuccess: () => {
            setTimeout(() => {
                queryClient.invalidateQueries({
                    queryKey: ["books"],
                });

                queryClient.invalidateQueries({
                    queryKey: ["rentals"],
                });
            }, 1000)
        }
    });

    return {
        mutate,
        isPending,
        isSuccess,
        isError,
        error,
    };
};
