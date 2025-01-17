import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../../hooks/useApi";
import { RegisterType } from "../../components/forms";

type RegisterReturnType = {
    firstName: string;
    lastName: string;
    email: string;
    library_card_code: string;
};

export const useRegisterUserMutation = () => {
    const { apiPost } = useApi();
    const queryClient = useQueryClient();

    const { mutate, data, error, isPending, isSuccess } = useMutation({
        mutationKey: ["userreg"],
        mutationFn: async (payload: RegisterType) => {
            return apiPost<RegisterReturnType, RegisterType>(`user/reg`, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["userreg"],
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
