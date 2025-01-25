import { createContext } from "react";

export interface FiltersContextType {
    chosenFilters: { year: string, month: string } | null;
    setChosenFilters: (payload: { year: string, month: string } | null) => void;
}

export const FiltersContext = createContext<FiltersContextType | null>(null);
