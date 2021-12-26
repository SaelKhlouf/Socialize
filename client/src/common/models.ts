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

export interface DropZoneInfo {
    files: FileWithPath[] | null;
    submissionErrors: string[] | null; 
}

export interface CropperInfo {
    cropped: boolean;
    base64: string | null;
}

export interface PhotoUploadInfo {
    submissionErrors: string[] | null; 
}

export type FileWithPreview = FileWithPath & {
    preview: string
}