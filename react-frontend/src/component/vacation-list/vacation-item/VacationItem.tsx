import React, {JSX, useState} from 'react';
import './VacationItem.css';
import {useNavigate} from "react-router-dom";
import {Vacation} from "../../../models/vacation";
import {vacationService} from "../../../services/vacation-service";
import {authStore} from "../../../state/auth-state";
import {appConfig} from "../../../utils/app-config";
import {RoleId} from "../../../models/enums";
import {VacationActionType, vacationStore} from "../../../state/vacation-state";

interface VacationItemProps {
    vacation: Vacation;
}

function VacationItem(vacationItemProps: VacationItemProps): JSX.Element {

    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState<boolean>(!!vacationItemProps.vacation.isLiked);
    const [likesCount, setLikesCount] = useState<number>(vacationItemProps.vacation.likesCount ?? 0);

    const user = authStore.getState().user;
    const isAdmin = Number(user?.roleId) === RoleId.Admin;

    async function removeVacation(vacation: Vacation): Promise<void> {
        if (!window.confirm(`Remove "${vacation.destination}"?`)) return;
        try {
            await vacationService.deleteVacation(vacation.id!);
        } catch (err) {
            alert(err);
        }
    }

    async function toggleLike(): Promise<void> {
        const userId = user?.id;
        if (!userId) return;
        const vacationId = vacationItemProps.vacation.id!;
        const wasLiked = isLiked;
        const previousCount = likesCount;
        const newLiked = !wasLiked;
        const newCount = previousCount + (wasLiked ? -1 : 1);
        setIsLiked(newLiked);
        setLikesCount(newCount);
        try {
            if (wasLiked) await vacationService.unfollow(userId, vacationId);
            else await vacationService.follow(userId, vacationId);
            // keep central store in sync so filters (e.g. "My Likes") and re-renders see the new state
            vacationStore.dispatch({
                type: VacationActionType.UpdateVacation,
                payload: {
                    ...vacationItemProps.vacation,
                    isLiked: newLiked ? 1 : 0,
                    likesCount: newCount,
                },
            });
        } catch (err) {
            setIsLiked(wasLiked);
            setLikesCount(previousCount);
            alert(err);
        }
    }

    const imageUrl = vacationItemProps.vacation.imageName
        ? appConfig.uploadsAddress + vacationItemProps.vacation.imageName
        : '';

    return (
        <div className="VacationItem">
            <div
                className="vacation-image"
                style={imageUrl ? {backgroundImage: `url(${imageUrl})`} : undefined}
            >
                <div className="vacation-image-overlay">
                    <h2 className="vacation-title">{vacationItemProps.vacation.destination}</h2>
                    {!isAdmin && (
                        <button className={`btn-like ${isLiked ? 'liked' : ''}`} onClick={toggleLike}>
                            <span className="heart">{isLiked ? '♥' : '♡'}</span>
                            <span className="count">{likesCount}</span>
                        </button>
                    )}
                </div>
            </div>

            <div className="vacation-body">
                <p className="vacation-description">{vacationItemProps.vacation.description}</p>
                <p className="vacation-dates">
                    <span className="icon">📅</span>
                    {new Date(vacationItemProps.vacation.startDate).toLocaleDateString()} – {new Date(vacationItemProps.vacation.endDate).toLocaleDateString()}
                </p>

                <div className="vacation-footer">
                    <div className="vacation-price">
                        <span className="price-currency">$</span>{Number(vacationItemProps.vacation.price).toLocaleString()}
                    </div>

                    {isAdmin && (
                        <div className="vacation-actions">
                            <button className="btn-update" onClick={() => navigate("/vacation-form/" + vacationItemProps.vacation.id!)}>Update</button>
                            <button className="btn-remove" onClick={() => removeVacation(vacationItemProps.vacation)}>Remove</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VacationItem;
