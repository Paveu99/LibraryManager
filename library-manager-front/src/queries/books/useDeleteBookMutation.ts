import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi"
import { useShallow } from "zustand/shallow";
import { useUserStore } from "../../store/useUserStore";

export const useDeleteBookMutation = (id: string) => {

    const { apiDelete } = useApi();
    const queryClient = useQueryClient();
    const { userId } = useUserStore(useShallow((state) => ({ userId: state.id })))

    const { mutate, data, isSuccess, error, isPending } = useMutation({
        mutationKey: ["book-del", id],
        mutationFn: async () => {
            return apiDelete<string>(`book/${id}`, userId)
        },
        onSuccess: () => {
            setTimeout(() => {
                queryClient.invalidateQueries({
                    queryKey: ["books"],
                });
            }, 2000);
        }
    })

    return {
        mutate,
        data,
        isSuccess,
        error,
        isPending
    }
}