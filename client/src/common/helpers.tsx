import { format } from "date-fns"
import jwtDecode from "jwt-decode"
import { User } from "../features/users/models"
import { DATE_FORMAT_WITHOUT_TIME } from "./constants"

export const formatDateWithoutTime = (date: Date) => {
    return format(new Date(date), DATE_FORMAT_WITHOUT_TIME)
}

export const decodeJwtAsUser = (token: string): User => {
    const decodedJwt = jwtDecode<any>(token);
    return {
        id: decodedJwt.id,
        userName: decodedJwt.userName,
        displayName: decodedJwt.displayName,
        email: decodedJwt.email,
    }
}

export const resolveFileNameExtension = (filename: string) => {
    if(!filename || filename.indexOf('.') === -1)
    {
        return null;
    }
    
    return filename.split('.').pop();
}