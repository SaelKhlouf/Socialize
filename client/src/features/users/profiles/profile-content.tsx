import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Header, Icon, Tab } from "semantic-ui-react";
import { RootState } from "../../../app/redux/rootReducer";
import { AppDispatch } from "../../../app/redux/store";
import PhotoUploadWidget from "../../../common/photoUpload/PhotoUploadWidget";
import { User } from "../models";
import { enableAddPhotoMode } from "../reducer";
import AddPhotoPane from "./add-photo-pane";
import PhotosPane from "./photos-pane";

interface Props {
    currentUser: User;
}

export default function ProfileContent({currentUser}: Props){
    const dispatch = useDispatch<AppDispatch>();
    const {addPhotoMode} = useSelector((state: RootState) => state.users);
    
    const panes = [
        { menuItem: 'About', render: () => <Tab.Pane>Tab 1 Content</Tab.Pane> },
        { menuItem: 'Activities', render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
        { menuItem: 'Photos', render: () => 
            <Tab.Pane> 
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={13}>
                            <Header as='h3'> 
                                <Icon name='images' />
                                Photos
                            </Header>
                        </Grid.Column>

                        <Grid.Column width={3}>
                            {
                                addPhotoMode ?
                                (<Button floated="right" onClick={() => dispatch(enableAddPhotoMode(false))}>Cancel</Button>)
                                :
                                (<Button floated="right" onClick={() => dispatch(enableAddPhotoMode(true))}>Add photo</Button>)
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                {
                    addPhotoMode ?
                    <PhotoUploadWidget />
                    :
                    <PhotosPane /> 
                }
                

            </Tab.Pane> 
        },
        { menuItem: 'Followers', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
        { menuItem: 'Following', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
      ]

    return (
        <Tab
            menu={{ fluid: true, vertical: true }}
            menuPosition='right'
            panes={panes}
        />
    );
}