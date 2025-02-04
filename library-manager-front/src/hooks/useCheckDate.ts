export const useCheckDate = (date: string, status: string) => {

    const rentDate = new Date(date);
    const returnDate = new Date();

    const diffInDays = (returnDate.getTime() - rentDate.getTime()) / (1000 * 60 * 60 * 24);

    return status === "rented" ? diffInDays : 0
}