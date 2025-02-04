import { FormControl, InputLabel, MenuItem, Paper, Select, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useGetLogsQuery } from "../../../queries/actionLogs/useGetLogsQuery";
import { useState } from "react";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from './styles.module.scss';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

export const Logs = () => {

    const { data, isLoading, error } = useGetLogsQuery();

    const [action, setAction] = useState<string>('');
    const [user, setUser] = useState<string>('');
    const [page, setPage] = useState(0);
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleActionChange = (value: string) => {
        setAction(value);
    };

    const handleUserChange = (value: string) => {
        setUser(value);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const filteredData = data
        ?.filter(row => (action ? row.action === action : true))
        ?.filter(row => {
            if (!user) return true;
            if (user === "Null") return row.user_id === null;
            return row.user_id === user;
        })
        ?.filter(row => {
            const rowDate = dayjs(row.timestamp);
            const isAfterStart = startDate ? rowDate.isAfter(startDate, 'day') || rowDate.isSame(startDate, 'day') : true;
            const isBeforeEnd = endDate ? rowDate.isBefore(endDate, 'day') || rowDate.isSame(endDate, 'day') : true;
            return isAfterStart && isBeforeEnd;
        });

    const indexOfLastPost = (page + 1) * rowsPerPage;
    const indexOfFirstPost = indexOfLastPost - rowsPerPage;
    const currentPosts = filteredData?.slice(indexOfFirstPost, indexOfLastPost);

    const actions = [...new Set(data?.map(item => item.action))];
    const users = [...new Set(data?.map(item => item.user_id))]
        .concat(null as unknown as string);

    if (isLoading) return <p className="warnings">Loading...</p>;
    if (error) return <p className="warnings">{error.message}</p>;

    return <main>
        <div className={styles.filters}>
            <p>Filters:</p>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Action</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={action}
                    label="Action"
                    onChange={(e) => handleActionChange(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {actions.map((el, index) => (<MenuItem value={el} key={index}>{el}</MenuItem>))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">User ID</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={user}
                    label="User ID"
                    onChange={(e) => handleUserChange(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {users.map((el, index) => (
                        <MenuItem value={el === null ? "Null" : el} key={index}>
                            {el === null ? "No User ID" : el}
                        </MenuItem>
                    ))}
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
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Action</StyledTableCell>
                        <StyledTableCell align="right">Details</StyledTableCell>
                        <StyledTableCell align="right">User&nbsp;ID</StyledTableCell>
                        <StyledTableCell align="right">Timestamp</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentPosts?.map((row) => (
                        <StyledTableRow key={row.id}>
                            <StyledTableCell component="th" scope="row">
                                {row.action}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.details}</StyledTableCell>
                            <StyledTableCell align="right">{row.user_id || "No User ID"}</StyledTableCell>
                            <StyledTableCell align="right">{dayjs(row.timestamp).format('YYYY-MM-DD HH:mm:ss')}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            sx={{ display: "flex", justifyContent: "center" }}
            component="div"
            count={filteredData?.length || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </main>;
};
