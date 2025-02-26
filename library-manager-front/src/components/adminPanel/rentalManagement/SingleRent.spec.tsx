import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SingleRent } from "./SingleRent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Book, Rental } from "../../../../../library-manager-back/types";

type SingleRentProps = {
    el: Rental,
    book: Book
};

const object: SingleRentProps = {
    book: {
        author: "Test author",
        available_copies: 5,
        total_copies: 10,
        description: "Test description",
        title: "Test title",
        year: 2000,
        id: "test_id"
    },
    el: {
        book_id: "test_id",
        rental_date: "2022-01-01",
        return_date: "2022-01-12",
        status: "returned",
        user_id: "test_user_id",
        id: 1
    }
};

const object2: SingleRentProps = {
    book: {
        author: "Test author 2",
        available_copies: 15,
        total_copies: 20,
        description: "Test description 2",
        title: "Test title 2",
        year: 2003,
        id: "test_id_2"
    },
    el: {
        book_id: "test_id_2",
        rental_date: "2025-02-01",
        return_date: "",
        status: "rented",
        user_id: "test_user_id_2",
        id: 2
    }
};

const renderWithProviders = (ui: React.ReactNode) => {
    const queryClient = new QueryClient();
    return render(
        <QueryClientProvider client={queryClient}>
            {ui}
        </QueryClientProvider>
    );
};

describe("SingleRent", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renders component with correct book data", () => {
        renderWithProviders(<SingleRent book={object.book} el={object.el} />);

        expect(screen.getByText("Test title - Test author, 2000")).toBeInTheDocument();
        expect(screen.getByText((content) => content.includes("Rented: 2022-01-01"))).toBeInTheDocument();
    });

    it("shows 'returned' status correctly", () => {
        renderWithProviders(
            <SingleRent book={object.book} el={{ ...object.el, return_date: "2022-01-12", status: "returned" }} />
        );

        expect(screen.getByText("RETURNED")).toBeInTheDocument();
    });

    it("does not show 'Return it' button for returned books", () => {
        renderWithProviders(
            <SingleRent book={object.book} el={{ ...object.el, return_date: "2022-01-12" }} />
        );

        expect(screen.queryByText("Force return")).not.toBeInTheDocument();
    });

    it("shows 'Return it' button for active rentals", () => {
        renderWithProviders(<SingleRent book={object2.book} el={object2.el} />);

        expect(screen.getByText("Force return")).toBeInTheDocument();
    });

    it("opens and closes modal correctly", () => {
        renderWithProviders(<SingleRent book={object2.book} el={object2.el} />);

        fireEvent.click(screen.getByText("Force return"));
        expect(screen.getByText("Confirmation!!!")).toBeInTheDocument();

        fireEvent.click(screen.getByText("No"));
        expect(screen.queryByText("Confirmation!!!")).not.toBeInTheDocument();
    });

    it("opens and returns book correctly", () => {
        renderWithProviders(<SingleRent book={object2.book} el={object2.el} />);

        fireEvent.click(screen.getByText("Force return"));
        expect(screen.getByText("Confirmation!!!")).toBeInTheDocument();

        fireEvent.click(screen.getByText("Yes"));
        expect(screen.queryByText("Confirmation!!!")).toBeInTheDocument();
    });
});
