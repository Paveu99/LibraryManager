import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { DeleteUser } from "./DeleteUser";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

vi.mock("@tanstack/react-router", () => ({
    useNavigate: vi.fn(() => vi.fn()),
}));

import * as rentalQueries from "../../../queries/rentals/useGetUserRentalsQuery";
import { Rental } from "../../../../../library-manager-back/types";

const renderWithProviders = (ui: React.ReactNode) => {
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
            {ui}
        </QueryClientProvider>
    );
};

const rentalMockReturned: Rental[] = [
    {
        id: 1,
        user_id: "123",
        book_id: "456",
        status: "returned",
        rental_date: "2024-01-10",
        return_date: "2024-02-10",
    },
];

const rentalMockRented: Rental[] = [
    {
        id: 1,
        user_id: "123",
        book_id: "456",
        status: "rented",
        rental_date: "2024-01-10",
        return_date: "",
    },
];


describe("DeleteUser", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Delete button is enabled when all rentals are returned", async () => {
        vi.spyOn(rentalQueries, "useGetUserRentalsQuery").mockReturnValue({
            data: rentalMockReturned,
            isLoading: false,
            error: null,
            refetch: vi.fn()
        });

        renderWithProviders(<DeleteUser />);
        const button = screen.getByText("Cancel membership");

        expect(button).toBeEnabled();

        await userEvent.click(button);
    });

    it("Delete button opens modal when clicked", async () => {
        vi.spyOn(rentalQueries, "useGetUserRentalsQuery").mockReturnValue({
            data: rentalMockReturned,
            isLoading: false,
            error: null,
            refetch: vi.fn()
        });

        renderWithProviders(<DeleteUser />);
        const button = screen.getByText("Cancel membership");

        await userEvent.click(button);

        expect(screen.getByText("Confirmation!!!")).toBeInTheDocument();
    });

    it("Delete button is disabled when user has active rentals", async () => {
        vi.spyOn(rentalQueries, "useGetUserRentalsQuery").mockReturnValue({
            data: rentalMockRented,
            isLoading: false,
            error: null,
            refetch: vi.fn()
        });

        renderWithProviders(<DeleteUser />);
        const button = screen.getByText("Cancel membership");

        expect(button).toBeDisabled();
    });
});
