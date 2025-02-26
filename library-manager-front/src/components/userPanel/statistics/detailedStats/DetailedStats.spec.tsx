import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { DetailedStats } from "./DetailedStats";
import { FiltersContext } from "../../../../context/FiltersContext";
import { useState } from "react";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("../../../../queries/stats/useGetPreciseUserStatsQuery", () => ({
    useGetPreciseUserStatsQuery: vi.fn(() => ({
        data: object1.allTime,
        isLoading: false,
        error: null,
    })),
}));

const object1 = {
    allTime: [
        { year: 2020, rented: 0, overdue: 0, returned: 1 },
        { year: 2021, rented: 0, overdue: 0, returned: 4 },
        { year: 2022, rented: 0, overdue: 2, returned: 3 },
        { year: 2023, rented: 0, overdue: 0, returned: 2 },
        { year: 2024, rented: 0, overdue: 1, returned: 3 },
        { year: 2025, rented: 3, overdue: 3, returned: 9 }
    ]
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    const [chosenFilters, setChosenFilters] = useState<{ year: string, month: string } | null>(null);

    return (
        <QueryClientProvider client={queryClient}>
            <FiltersContext.Provider value={{ chosenFilters, setChosenFilters }}>
                {children}
            </FiltersContext.Provider>
        </QueryClientProvider>
    );
};

const renderWithProviders = (ui: React.ReactNode) => render(<TestWrapper>{ui}</TestWrapper>);

const selectOption = async (label: string, optionText: string) => {
    const selectElement = screen.getByLabelText(label);
    await userEvent.click(selectElement);

    const optionElements = await screen.findAllByText(optionText);
    const option = optionElements.find((el) => el.tagName.toLowerCase() === "li");

    expect(option).toBeDefined();
    if (option) {
        await userEvent.click(option);
    }
};

describe("DetailedStats", () => {
    it("renders component with correct all-time data", async () => {
        renderWithProviders(<DetailedStats allTime={object1.allTime} />);
        await screen.findByText("2020");
    });

    it("renders correctly when there is no data", () => {
        renderWithProviders(<DetailedStats allTime={[]} />);
        expect(screen.getByText("No data to display")).toBeInTheDocument();
    });

    it("allows user to select a year and updates displayed data", async () => {
        renderWithProviders(<DetailedStats allTime={object1.allTime} />);
        await selectOption("Year", "2025");
    });

    it("allows user to select a year and a month, then updates displayed data", async () => {
        renderWithProviders(<DetailedStats allTime={object1.allTime} />);
        await selectOption("Year", "2025");
        await selectOption("Month", "January");
    });
});
