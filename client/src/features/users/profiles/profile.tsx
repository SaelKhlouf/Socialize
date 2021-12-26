import { useSelector } from "react-redux";
import { Container } from "semantic-ui-react";
import { RootState } from "../../../app/redux/rootReducer";
import ProfileContent from "./profile-content";
import ProfileHeader from "./profile-header";

export default function Profile(){
    const {currentUser} = useSelector((state: RootState) => state.users);

    return (
        <Container>
            <ProfileHeader currentUser={currentUser} />
            <ProfileContent currentUser={currentUser} />
        </Container>
    );
}