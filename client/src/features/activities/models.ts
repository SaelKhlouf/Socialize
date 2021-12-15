import { User } from "../users/models";

export interface Activity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    city: string;
    venue: string;
    status?: ActivityStatus;
    host?: User;
    users?: User[];
}

export enum ActivityStatus {
    Active = 0,
    Cancelled = 1
}