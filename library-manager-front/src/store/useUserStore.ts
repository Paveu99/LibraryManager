import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserDetials } from "../../../library-manager-back/types";

type UserActions = {
    setUserData: (payload: UserDetials) => void;
    clear: () => void;
};

const initialState: UserDetials = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    role: "client"
};

export const useOrderStore = create<UserDetials & UserActions>()(
    persist(
        (set) => ({
            ...initialState,
            setUserData: (payload: UserDetials) => {
                set(payload);
            },
            clear: () => set(initialState),
        }),
        {
            name: "user",
            version: 1,
        }
    )
);
