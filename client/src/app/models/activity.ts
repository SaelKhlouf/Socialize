export interface Activity {
    id: string;
    title: string;
    description: string;
    category: string;
    date: Date | null;
    city: string;
    venue: string;
}

export interface DataList<T> {
    data: T[];
    count: number;
}