import React, {JSX, useEffect, useState} from 'react';
import './VacationReport.css';
import {Vacation} from "../../models/vacation";
import {vacationService} from "../../services/vacation-service";
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {CSVLink} from "react-csv";

function VacationReport(): JSX.Element {

    const [data, setData] = useState<{destination: string; likes: number}[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const vacations: Vacation[] = await vacationService.getVacationList();
                const rows = vacations.map(v => ({destination: v.destination, likes: v.likesCount ?? 0})).sort((a, b) => b.likes - a.likes);
                setData(rows);
                setLoading(false);
            }
            catch (err) {
                alert(err)
            }
        })();
    }, [])

    return (
        <div className="VacationReport">
            <h1>Vacation Report</h1>
            <CSVLink data={data} filename="vacation-report.csv">Download CSV</CSVLink>
            {loading ? <p>Loading...</p> : data.length === 0 ? <p>No vacations.</p> : (
            <ResponsiveContainer width="100%" height={Math.max(300, data.length * 36)}>
                <BarChart data={data} layout="vertical" margin={{left: 40, right: 20}}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis type="number" allowDecimals={false} stroke="#94a3b8" />
                    <YAxis type="category" dataKey="destination" width={120} stroke="#94a3b8" />
                    <Tooltip
                        contentStyle={{backgroundColor: '#1e293b', border: '1px solid #475569', color: '#e2e8f0'}}
                        cursor={{fill: 'rgba(96, 165, 250, 0.1)'}}
                    />
                    <Bar dataKey="likes" fill="#60a5fa" radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
            )}
        </div>
    );
}

export default VacationReport;
