import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Header, Button } from "semantic-ui-react";
import { RootState } from "../../app/redux/rootReducer";
import { AppDispatch } from "../../app/redux/store";
import { uploadUserImage } from "../../features/users/reducer";
import ErrorContainer from "../containers/ErrorContainer";
import { FileWithPreview } from "../models";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

export default function PhotoUploadWidget(){
    const dispatch = useDispatch<AppDispatch>();

    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [cropper, setCropper] = useState<Cropper>();

    const [submitting, setSubmitting] = useState<boolean>(false);

    const onCrop = () => {
        if (!cropper) {
            return;
        }
        setSubmitting(true);

        try{
            cropper.getCroppedCanvas().toBlob(async (blob) => {
                await dispatch(uploadUserImage({
                    blob: blob!,
                    publicRead: true
                })).unwrap();
            });
        }catch(err){
        }finally{
            setSubmitting(false);
        }
    };

    const onClose = () => {
        setFiles([]);
        setErrors([]);
        setCropper(undefined);
    }

    //When you supply 'return' in useEffect, the code will be called when the component is destroyed (removed)
    useEffect(() => {
        return () => {
            console.log('unmount: clear DOMStrings');
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files]);

    return (
        <Grid>
            <Grid.Row centered>
                <Grid.Column width={5} textAlign="center">
                    <Header color="teal" as='h3'> 
                        Step 1: Add Photo 
                    </Header>

                    <PhotoWidgetDropzone maxFilesNumber={1} filesType='image/jpeg, image/png, image/jpg' setFiles={setFiles} setErrors={setErrors} />
                </Grid.Column>

                <Grid.Column width={5} textAlign="center">
                    <Header color="teal" as='h3'> 
                        Step 2: Crop Photo 
                    </Header>

                    {
                        files && files.length > 0 &&
                        (<PhotoWidgetCropper imageSrc={files[0].preview} setCropper={setCropper} />)
                    }
                </Grid.Column>

                <Grid.Column width={5} textAlign="center">
                    <Header color="teal" as='h3'> 
                        Step 3: Confirm
                    </Header>

                    {
                        files && files.length > 0 &&
                        (
                        <div style={{height: 200, width: "100%", border: '0.01em solid grey'}}>
                            <div
                                className="img-preview"
                                style={{ width: "100%", float: "left", height: "100%", overflow: 'hidden'}}
                            />
                        </div>
                        )
                    }

                </Grid.Column>
            </Grid.Row>

            <Grid.Row centered>
                <Grid.Column width={5} />
                
                <Grid.Column width={5} />
                
                <Grid.Column width={5} textAlign="center">
                {
                    files && files.length > 0 &&
                    (
                        <Button.Group widths={2}>
                            <Button color="green" icon="check" size='large' onClick={onCrop} loading={submitting} /> 
                            <Button color="red" icon="close" size='large' onClick={onClose} disabled={submitting} /> 
                        </Button.Group>
                    )
                }
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={16}>
                {
                    errors && errors.length !== 0 &&
                    <ErrorContainer errors={errors[0]} />
                }
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}