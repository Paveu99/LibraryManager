import { renderHook } from "@testing-library/react"
import { useCheckDate } from "./useCheckDate"

describe("useCheckDate", () => {
    it("Checking if, based on given status: rented and today hook returns 0", () => {
        const today = (new Date()).toString()
        const { result } = renderHook(() => useCheckDate(today, "rented"));

        expect(result.current).toEqual(0)
    });

    it("Checking if, based on given status: rented and date: 18th of January hook returns number of days", () => {
        const date18Th = "2025-01-18 00:00:00"
        const { result } = renderHook(() => useCheckDate(date18Th, "rented"));

        expect(result.current).toBeGreaterThan(0);
        expect(result.current).toBeLessThan(30);
        expect(result.current).toEqual(19);
    });

    it("Checking if, based on given status: overdue and date: 18th of January hook returns 0", () => {
        const date18Th = "2025-01-18 00:00:00"
        const { result } = renderHook(() => useCheckDate(date18Th, "overdue"));

        expect(result.current).toEqual(0);
    });

    it("Checking if, based on given status: returned and date: 18th of January hook returns 0", () => {
        const date18Th = "2025-01-18 00:00:00"
        const { result } = renderHook(() => useCheckDate(date18Th, "returned"));

        expect(result.current).toEqual(0);
    });

    it("Checking if, based on invalid date type and status: returned hook returns error", () => {
        expect(() => useCheckDate("error data", "rented")).toThrow();
        expect(() => useCheckDate("error data", "rented")).toThrowError();
    });
})