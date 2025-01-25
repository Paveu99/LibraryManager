import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useApi } from "../../hooks/useApi"
import { useUserStore } from "../../store/useUserStore";
import { useShallow } from "zustand/shallow";

export const useRentBookMutation = () => {
    const { apiPost } = useApi();
    const { id } = useUserStore(
        useShallow((state) => ({
            id: state.id,
        }))
    );
    const queryClient = useQueryClient();

    const { mutate, isPending, isSuccess, isError, error } = useMutation({
        mutationFn: async (bookId: string) => {
            return apiPost("rental/rent", { bookId }, id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["books"],
            });
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
