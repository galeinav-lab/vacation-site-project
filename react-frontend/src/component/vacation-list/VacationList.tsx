import React, {JSX, useEffect, useState} from 'react';
import './VacationList.css';
import {Vacation} from "../../models/vacation";
import {vacationService} from "../../services/vacation-service";
import VacationItem from "./vacation-item/VacationItem";
import {vacationStore} from "../../state/vacation-state";
import {authStore} from "../../state/auth-state";
import {RoleId} from "../../models/enums";

type VacationFilter = 'all' | 'upcoming' | 'live' | 'liked';

const PAGE_SIZE = 10;

function VacationList(): JSX.Element {

    let [vacationList, setVacationList] = useState<Vacation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<VacationFilter>('all');
    const [page, setPage] = useState<number>(1);

    const user = authStore.getState().user;
    const isAdmin = Number(user?.roleId) === RoleId.Admin;

    useEffect(() => {

        const subscription = vacationStore.subscribe(() => {
            setVacationList(vacationStore.getState().vacationList);
        });

        (async function getVacationList() {
            try {
                vacationList = await vacationService.getVacationList();
                setVacationList(vacationList);
                setLoading(false);
            }
            catch (err) {
                alert(err);
            }
        })();

        return () => subscription();

    }, []);

    const now = new Date();
    const displayed = vacationList
        .filter(v => {
            const start = new Date(v.startDate);
            const end = new Date(v.endDate);
            switch (filter) {
                case 'upcoming': return start > now;
                case 'live':     return start <= now && end >= now;
                case 'liked':    return !!v.isLiked;
                default:         return true;
            }
        })
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    useEffect(() => { setPage(1); }, [filter]);

    const totalPages = Math.max(1, Math.ceil(displayed.length / PAGE_SIZE));
    const safePage = Math.min(page, totalPages);
    const pageItems = displayed.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

    return (
        <div className="vacationList">
            <div className="filter-bar">
                <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
                <button className={filter === 'upcoming' ? 'active' : ''} onClick={() => setFilter('upcoming')}>Not Started Yet</button>
                <button className={filter === 'live' ? 'active' : ''} onClick={() => setFilter('live')}>Live Now</button>
                {isAdmin ? null : <button className={filter === 'liked' ? 'active' : ''} onClick={() => setFilter('liked')}>My Likes</button>}
            </div>

            {loading ? <h4>Loading...</h4> : displayed.length === 0 ? <h4>No Results</h4> :
                <>
                    <div className="vacationCards">{pageItems.map(vacation => <VacationItem vacation={vacation} key={vacation.id} />)}</div>
                    <div className="pager">
                        <button disabled={safePage === 1} onClick={() => setPage(p => p - 1)}>Prev</button>
                        <span>Page {safePage} of {totalPages}</span>
                        <button disabled={safePage >= totalPages} onClick={() => setPage(p => p + 1)}>Next</button>
                    </div>
                </>
            }
        </div>
    );
}

export default VacationList;
