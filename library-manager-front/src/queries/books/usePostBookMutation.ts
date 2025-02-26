import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi"
import { Book, BookDto } from "../../../../library-manager-back/types";
import { useUserStore } from "../../store/useUserStore";
import { useShallow } from "zustand/shallow";

export const usePostBookMutation = () => {
    const { apiPost } = useApi();
    const queryClient = useQueryClient();
    const { id } = useUserStore(useShallow((state) => ({ id: state.id })))

    const { data, mutate, isSuccess, error, isPending } = useMutation({
        mutationKey: ['add-book'],
        mutationFn: async (payload: BookDto) => {
            return apiPost<Book, BookDto>(`book`, payload, id)
        },
        onSuccess: () => {
            setTimeout(() => {
                queryClient.invalidateQueries({
                    queryKey: ["books"],
                });
            }, 2000)
        },
    })

    return {
        data,
        mutate,
        isSuccess,
        error,
        isPending
    }
}