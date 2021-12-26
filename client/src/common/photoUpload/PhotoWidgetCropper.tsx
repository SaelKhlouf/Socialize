import { useEffect, useRef, useState } from "react";
import Cropper from "react-cropper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/redux/rootReducer";
import { AppDispatch } from "../../app/redux/store";
import { setCropperInfoReducer } from "../reducer";

interface Props{
    imageSrc: string;
    setCropper: (cropper: Cropper) => void;
}

export default function PhotoWidgetCropper({imageSrc, setCropper}: Props) {    


  console.log('imageSrc : ' + imageSrc);
    // useEffect(() => {
    //     const imageElement: any = cropperRef?.current;
    //     const cropper: any = imageElement?.cropper;
    //     const canvas: any = cropper?.getCroppedCanvas();

    //     if(cropped && cropper && canvas){
    //         console.log('imageSrc + ' + imageSrc);
    //         const base64: string = canvas.toDataURL();
    //         console.log('base64 '+ base64);
    //         dispatch(setCropperInfoReducer({
    //             base64: base64
    //         }));
    //     }
    // }, [cropped, dispatch]);

    return (

        <Cropper 
        src={imageSrc}
        style={{height: 200, width: '100%'}}
        initialAspectRatio={1}
        aspectRatio={1}
        preview='.img-preview'
        guides={false}
        viewMode={1}
        autoCropArea={0}
        background={false}
        onInitialized={cropper => setCropper(cropper)}
    />
    );
}