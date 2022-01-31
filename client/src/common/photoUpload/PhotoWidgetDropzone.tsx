import React, { useCallback } from 'react';
import {useDropzone, FileRejection} from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';
import { FileWithPreview } from '../models';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
} as React.CSSProperties;

const activeStyle = {
    borderColor: '#2196f3'
};
  
const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

interface Props {
    maxFilesNumber: number;
    filesType: string;
    setFiles: (files: FileWithPreview[]) => void;
    setErrors: (errors: string[]) => void;
}

export default function PhotoWidgetDropzone(props: Props) {
    const onDrop = useCallback(
        (acceptedFiles: any[], fileRejections: FileRejection[]) => {
            if(fileRejections.length === 0){
                const files = acceptedFiles.map((acceptedFile) => {
                    return Object.assign(acceptedFile, {
                        preview: URL.createObjectURL(acceptedFile)
                    });
                })
                props.setFiles(files);

                console.log('files[0].preview: ' + files[0].preview);
                return;
            }

            const errors: string[] = [];
            const filesErrors = fileRejections.flatMap(p => p.errors);

            if(filesErrors.some(p => p.code === 'too-many-files')){
                errors.push(`Number of files must not exceed ${props.maxFilesNumber}`);
            }else{
                filesErrors.forEach(err => {
                    if(err.code === 'file-invalid-type'){
                        errors.push(`File extension must be ${props.filesType}`);
                    } else{
                        errors.push(`Error occured ${err.message}`);
                    }
                });
            }

            if(errors && errors.length > 0){
                props.setErrors(errors);

                console.log('errors: ' + errors);
            }
    },[props]);

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
        } = useDropzone({    
        maxFiles: props.maxFilesNumber || 1,
        accept: props.filesType,
        onDrop
    });

    const style = {
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    };
  
  return (
    <section className="container">
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <Icon name ='upload' size='massive' color='black' />
        <Header as='h3'>Drop image here</Header>
      </div>
    </section>
  );
}
