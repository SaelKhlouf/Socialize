import Cropper from "react-cropper";

interface Props{
    imageSrc: string;
    setCropper: (cropper: Cropper) => void;
}

export default function PhotoWidgetCropper({imageSrc, setCropper}: Props) {    

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