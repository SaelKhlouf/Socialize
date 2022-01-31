import { FileWithPath } from "react-dropzone";

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
    submissionErrors: string | null; //TODO: support multiple errors
}

export type FileWithPreview = FileWithPath & {
    preview: string
}