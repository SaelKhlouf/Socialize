export interface DataList<T> {
    data: T[];
    count: number;
}

export enum ModalTypes {
    login,
    register
}

export interface ModalInfo {
    showModal: boolean;
    type: ModalTypes;
    submissionErrors: string | null;
}