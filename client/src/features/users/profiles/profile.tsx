import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { RootState } from "../../../app/redux/rootReducer";
import { AppDispatch } from "../../../app/redux/store";
import { fetchUserDetails } from "../reducer";
import ProfileContent from "./profile-content";
import ProfileHeader from "./profile-header";

export default function Profile(){
    const dispatch = useDispatch<AppDispatch>();
    let params = useParams();
    
    const {currentUser, fetchedUserDetails} = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUserDetails(params.id!));
    }, [dispatch]);

    return (
        <Container>
            <ProfileHeader currentUser={currentUser} />
            <ProfileContent currentUser={currentUser} fetchedUserDetails={fetchedUserDetails} />
        </Container>
    );
}