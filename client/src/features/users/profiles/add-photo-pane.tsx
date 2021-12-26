// import { useEffect, useMemo } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button, Grid, Header } from "semantic-ui-react";
// import { RootState } from "../../../app/redux/rootReducer";
// import { AppDispatch } from "../../../app/redux/store";
// import ErrorContainer from "../../../common/containers/ErrorContainer";
// import PhotoCropperWidget from "../../../common/photoUpload/photo-cropper-widget";
// import PhotoDropWdiget from "../../../common/photoUpload/photo-drop-widget";
// import { setCropperInfoReducer } from "../../../common/reducer";
// import { selectUserThumbnail, uploadUserImage } from "../reducer";

// export default function AddPhotoPane(){
//     const dispatch = useDispatch<AppDispatch>();

//     let {submissionErrors, files} = useSelector((state: RootState) => state.common.dropZoneInfo);
//     let {base64} = useSelector((state: RootState) => state.common.cropperInfo);
//     let {thumbnail} = useSelector((state: RootState) => state.users.currentUser);

//     const handleCrop = () => {
//         dispatch(setCropperInfoReducer({
//             cropped: true
//         }));
//     };

//     useEffect(() => {
//         const uploadUserImageAndSetThumbnailIfNotSet = async (base64: string) => {
//             const {fileName} = await dispatch(uploadUserImage({
//                 base64: base64,
//                 publicRead: true
//             })).unwrap();

//             if(!thumbnail){
//                 await dispatch(selectUserThumbnail({
//                     ImageName: fileName
//                 }));
//             }
//         };

//         if(base64){
//             uploadUserImageAndSetThumbnailIfNotSet(base64);
//         }
//     }, [base64, thumbnail, dispatch]);

//     const imageSrc = useMemo(() => {
//         return files && files[0];
//     }, [files]);

   
// }

export default function dummy(){
    
}