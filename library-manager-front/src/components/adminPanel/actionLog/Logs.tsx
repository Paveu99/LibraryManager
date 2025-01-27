import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useGetLogsQuery } from "../../../queries/actionLogs/useGetLogsQuery"
import { useState } from "react";

export const Logs = () => {

    const { data, isLoading, error } = useGetLogsQuery();

    const [page, setPage] = useState(0);
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

    const indexOfLastPost = (page + 1) * rowsPerPage;
    const indexOfFirstPost = indexOfLastPost - rowsPerPage;
    const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    console.log(currentPosts);


    return <main>
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
                            <StyledTableCell align="right">{row.timestamp.split('T')[0]} {row.timestamp.split('T')[1].split('.')[0]}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            sx={{ display: "flex", justifyContent: "center" }}
            component="div"
            count={data?.length || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </main>
}