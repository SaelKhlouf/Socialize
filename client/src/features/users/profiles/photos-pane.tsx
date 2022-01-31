import { useState } from "react";
import { useDispatch } from "react-redux";
import { Icon, Card, Button, Image } from "semantic-ui-react";
import { AppDispatch } from "../../../app/redux/store";
import { deleteUserImage, selectUserThumbnail } from "../reducer";

interface Props{
    photos: string[];
    thumbnail?: string;
}

export default function PhotosPane({photos, thumbnail}: Props){
    const dispatch = useDispatch<AppDispatch>();

    const [target, setTarget] = useState(null);
    const [updatingThumbnail, setUpdatingThumbnail] = useState(false);
    const [deletingPhoto, setDeletingPhoto] = useState(false);
    
    const handleSetThumbnail = async (photo: string, event: any) => {
        setUpdatingThumbnail(true);
        setTarget(event.target.name);

        try{
            const imageName = photo.split("/").pop();
            if(imageName){
                await dispatch(selectUserThumbnail({
                    imageName: imageName
                })).unwrap();
            }
        }catch(err){
        }finally{
            setUpdatingThumbnail(false);
        }
    };

    const handleDeletePhoto = async (photo: string, event: any) => {
        setDeletingPhoto(true);
        setTarget(event.target.name);
        try{
            const imageName = photo.split("/").pop();
            if(imageName){
                await dispatch(deleteUserImage({
                    imageName: imageName
                })).unwrap();
            }
        }catch(err){
            
        }finally{
            setDeletingPhoto(false);
            setTarget(null);
        }
    };
    
    return (
        <Card.Group itemsPerRow={4}>
            {
                photos.map(photo => (
                    <Card>
                        <Image src={photo} alt='/assets/user.png' />
                        <Button.Group  widths={2} >
                            <Button name={photo} basic color='green' disabled={thumbnail === photo || (updatingThumbnail || deletingPhoto)} onClick={(event) => handleSetThumbnail(photo, event)} loading={updatingThumbnail && target === photo}>
                                Main
                            </Button>
                            <Button name={photo} basic color='red' disabled={thumbnail === photo || (updatingThumbnail || deletingPhoto)} onClick={(event) => handleDeletePhoto(photo, event)} loading={deletingPhoto && target === photo}>
                                <Icon name='trash' />
                            </Button>
                        </Button.Group>
                    </Card>
                ))
            }
            
        </Card.Group>
    );
}