export const useCheckDate = (date: string, status: string) => {
    if (status !== "rented") return 0;

    const rentDate = new Date(date);
    if (isNaN(rentDate.getTime())) {
        throw new Error(`Invalid date provided: ${date}`);
    }

    const returnDate = new Date();
    rentDate.setHours(0, 0, 0, 0);
    returnDate.setHours(0, 0, 0, 0);

    return Math.round((returnDate.getTime() - rentDate.getTime()) / (1000 * 60 * 60 * 24));
};
