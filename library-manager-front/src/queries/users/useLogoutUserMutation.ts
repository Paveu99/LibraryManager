import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi";
import { useUserStore } from "../../store/useUserStore";
import { useShallow } from "zustand/shallow";

export const useLogoutMutation = () => {
    const { id } = useUserStore(
        useShallow((state) => ({
            id: state.id,
        }))
    );
    const { apiPost } = useApi();
    const queryClient = useQueryClient();

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["user"],
        mutationFn: async () => {
            return apiPost<null, null>("user/logout", null, id);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user"],
            });
        },
    });

    return {
        data,
        mutate,
        isPending,
        error,
        isSuccess,
    };
};

