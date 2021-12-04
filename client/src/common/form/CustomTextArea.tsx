import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';

 interface Props {
     name: string;
     label?: string;
     placeholder?: string;
     value?: string;
     rows: number;
}

export function CustomTextArea({label, ...props} : Props){
    const [field, meta] = useField(props);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label> {label} </label>
            <Form.TextArea {...field} {...props} />
            {meta.touched && !!meta.error ? (
                <Label basic color='red' pointing style={{marginTop: '0'}}>
                    {meta.error}
                </Label>
            ) : null}
        </Form.Field>
    );
}