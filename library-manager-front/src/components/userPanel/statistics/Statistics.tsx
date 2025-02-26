import { PieChart } from '@mui/x-charts/PieChart';
import { useGetUserStatsQuery } from '../../../queries/stats/useGetUserStatsQuery';
import { useGetPreciseUserStatsQuery } from '../../../queries/stats/useGetPreciseUserStatsQuery';
import { DetailedStats } from './detailedStats';
import { useState } from 'react';
import { FiltersContext } from '../../../context/FiltersContext';
import styles from './styles.module.scss';

export const Statistics = () => {
    const { data, isLoading, error } = useGetUserStatsQuery();
    const { data: detailedStats } = useGetPreciseUserStatsQuery<{ year: number; rented: number; overdue: number; returned: number }[]>();
    const [chosenFilters, setChosenFilters] = useState<{ year: string, month: string } | null>(null);

    const chartData = data
        ? data.map((item) => ({
            label: item.status[0].toUpperCase() + item.status.slice(1),
            value: item.count,
        }))
        : [
            { label: 'No Data', value: 100 },
        ];

    const valueFormatter = (item: { value: number }) => `${item.value}`;

    if (!detailedStats || !data) return <p className="warnings">Loading...</p>;
    if (isLoading) return <p className="warnings">Loading...</p>;
    if (error) return <p className="warnings">{error.message}</p>;

    return (
        <FiltersContext.Provider value={{ chosenFilters, setChosenFilters }}>
            <div className={styles.container}>
                <div>
                    <h2>All time statistics:</h2>
                    <PieChart
                        series={[{
                            data: chartData,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            valueFormatter,
                        }]}
                        height={200}
                        width={400}
                    />
                </div>
                <div>
                    <h2>Detailed statistics:</h2>
                    <DetailedStats allTime={detailedStats} />
                </div>
            </div>
        </FiltersContext.Provider>
    );
};
