import { useField } from 'formik';
import { Form, Label, Select } from 'semantic-ui-react';

 interface Props {
     name: string;
     label?: string;
     placeholder?: string;
     value?: string;
     options: {key: string, text: string, value: string}[];
}

export function CustomSelectInput({label, ...props} : Props){
    const [field, meta, helpers] = useField(props);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label> {label} </label>
            
            <Select clearable
                options={props.options}
                placeholder={props.placeholder}
                value={field.value}
                onChange={(e, d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
                search
            />

            {meta.touched && !!meta.error ? (
                <Label basic color='red' pointing style={{marginTop: '0'}}>
                    {meta.error}
                </Label>
            ) : null}
        </Form.Field>
    );
}