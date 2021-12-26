import { useEffect, useRef, useState } from "react";
import { Grid, Header, Button } from "semantic-ui-react";
import ErrorContainer from "../containers/ErrorContainer";
import { FileWithPreview } from "../models";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

export default function PhotoUploadWidget(){
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [cropper, setCropper] = useState<Cropper>();

    const onCrop = () => {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => {
                //upload photo here
                console.log('files[0]' + files[0].path);
            });
        }
    };

    // useEffect(() => {
    //     return () => {
    //         files.forEach((file: any) => URL.revokeObjectURL(file.preview))
    //     }
    // }, [files]);


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
                            <Button color="teal" icon="check" size='large' onClick={onCrop} /> 
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