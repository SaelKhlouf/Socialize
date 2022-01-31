import { format } from "date-fns"
import { DATE_FORMAT_WITHOUT_TIME } from "./constants"

export const formatDateWithoutTime = (date: Date) => {
    return format(new Date(date), DATE_FORMAT_WITHOUT_TIME)
}

export const resolveFileNameExtension = (filename: string) => {
    if(!filename || filename.indexOf('.') === -1)
    {
        return null;
    }
    
    return filename.split('.').pop();
}