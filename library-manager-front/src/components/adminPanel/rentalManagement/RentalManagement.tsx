import { useState } from "react";
import { FormControl, InputLabel, List, MenuItem, Select, TablePagination } from "@mui/material";
import { useGetRentalsQuery } from "../../../queries/rentals/useGetRentalsQuery";
import { useGetBooksQuery } from "../../../queries/books/useGetBooksQuery";
import { Book } from "../../../../../library-manager-back/types";
import { SingleRent } from "./SingleRent";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styles from './styles.module.scss'

export const RentalMangement = () => {

    const { data, error: errorRentals, isLoading } = useGetRentalsQuery();
    const { data: books, error: errorBooks } = useGetBooksQuery();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [status, setStatus] = useState<string>('');

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleActionChange = (value: string) => {
        setStatus(value);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredData = data
        ?.filter(row => (status ? row.status === status : true))
        ?.filter(row => {
            const rowDate = dayjs(row.rental_date);
            const isAfterStart = startDate ? rowDate.isAfter(startDate, 'day') || rowDate.isSame(startDate, 'day') : true;
            const isBeforeEnd = endDate ? rowDate.isBefore(endDate, 'day') || rowDate.isSame(endDate, 'day') : true;
            return isAfterStart && isBeforeEnd;
        });

    const indexOfLastPost = (page + 1) * rowsPerPage;
    const indexOfFirstPost = indexOfLastPost - rowsPerPage;
    const currentPosts = filteredData?.slice(indexOfFirstPost, indexOfLastPost);

    if (errorBooks || errorRentals) return <h2>Failed to fetch data!</h2>;

    const findBook = (el: string) => {
        return books?.find(book => book.id === el) as Book
    }

    if (isLoading) return <p className="warnings">Loading...</p>;
    if (errorRentals) return <p className="warnings">{errorRentals}</p>;
    if (errorBooks) return <p className="warnings">{errorBooks}</p>;

    if (data?.length === 0) return <h2>No history for this user!</h2>;

    const actions = [...new Set(data?.map(item => item.status.toUpperCase()[0] + item.status.slice(1)))];

    return <>
        <div className={styles.filters}>
            <p>Filters:</p>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Status</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={status}
                    label="Action"
                    onChange={(e) => handleActionChange(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {actions.map((el, index) => (<MenuItem value={el} key={index}>{el}</MenuItem>))}
                </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Start Date"
                    sx={{ paddingRight: "10px" }}
                    value={startDate}
                    onChange={(newValue) => setStartDate(newValue)}
                    maxDate={dayjs()}
                />
                <DatePicker label="End Date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                    minDate={startDate || undefined}
                />
            </LocalizationProvider>
        </div>
        <List style={{ width: "100%" }}>
            {currentPosts?.map((el) => {
                const book = findBook(el.book_id)
                return (
                    <SingleRent book={book} el={el} key={el.id} />
                )
            })}
        </List>
        <TablePagination
            sx={{ display: "flex", justifyContent: "center" }}
            component="div"
            count={filteredData?.length || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>
}