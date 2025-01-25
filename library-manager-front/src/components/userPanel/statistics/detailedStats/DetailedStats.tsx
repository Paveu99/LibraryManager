import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetPreciseUserStatsQuery } from "../../../../queries/stats/useGetPreciseUserStatsQuery";
import { axisClasses, BarChart } from "@mui/x-charts";
import { useFiltersContext } from "../../../../context/useFiltersContext";

type Props = {
    allTime: {
        month?: string;
        year?: number;
        rented: number;
        overdue: number;
        returned: number;
    }[]
}

export const DetailedStats = ({ allTime }: Props) => {
    const [year, setYear] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const { data, isLoading } = useGetPreciseUserStatsQuery<{ month: string; rented: number; overdue: number; returned: number }[]>(Number(year));
    const { setChosenFilters } = useFiltersContext();

    const handleChange = (value: string) => {
        setYear(value);
        setMonth('');
    };

    const handleMonthChange = (value: string) => {
        setMonth(value);
    };

    const chartSetting = {
        yAxis: [
            {
                label: 'Amount of books',
            },
        ],
        width: 600,
        height: 200,
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translate(-5px, 0)',
            },
        },
    };

    useEffect(() => {
        setChosenFilters({
            year: year,
            month: month
        })
    }, [year, month])

    const filteredData = data?.filter(item => month ? item.month === month : true);

    if (isLoading) return <p>Loading detailed stats...</p>;

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Year</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={year}
                    label="Year"
                    onChange={(e) => handleChange(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {allTime.map((el, index) => (<MenuItem value={el.year} key={index}>{el.year}</MenuItem>))}
                </Select>
            </FormControl>
            {year && <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Month</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={month}
                    label="Month"
                    onChange={(e) => handleMonthChange(e.target.value)}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {data?.map((el, index) => (<MenuItem value={el.month} key={index}>{el.month}</MenuItem>))}
                </Select>
            </FormControl>}
            {
                !year ? <BarChart
                    dataset={allTime.map(el => ({ ...el, year: el.year || 'Unknown Year' }))}
                    xAxis={[{ scaleType: 'band', dataKey: 'year' }]}
                    series={[
                        { dataKey: 'rented', label: 'Rented' },
                        { dataKey: 'returned', label: 'Returned' },
                        { dataKey: 'overdue', label: 'Overdue' }
                    ]}
                    {...chartSetting}
                /> :
                    <BarChart
                        dataset={filteredData?.map(el => ({
                            ...el,
                            month: el.month || 'Unknown Month',
                        }))}
                        xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                        series={[
                            { dataKey: 'rented', label: 'Rented' },
                            { dataKey: 'returned', label: 'Returned' },
                            { dataKey: 'overdue', label: 'Overdue' }
                        ]}
                        {...chartSetting}
                    />
            }
        </div>
    );
};
