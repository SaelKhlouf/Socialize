import { User } from "../users/models";

export interface EditActivityModel {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}

export interface CreateActivityModel {
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
}

export interface Activity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
    status: ActivityStatus;
    host: User;
    users: User[];
}

export enum ActivityStatus {
    Active = 0,
    Cancelled = 1
}

export const mapEditActivityModel = (activity: Activity)  => {
    return {
        id: activity.id,
        title: activity.title,
        description: activity.description,
        category: activity.category,
        date: activity.date,
        city: activity.city,
        venue: activity.venue,
    }
}

export const mapCreateActivityModel = (activity: EditActivityModel) : CreateActivityModel => {
    return {
        title: activity.title,
        description: activity.description,
        category: activity.category,
        date: activity.date,
        city: activity.city,
        venue: activity.venue,
    }
}