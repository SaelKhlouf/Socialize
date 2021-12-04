import { useField } from 'formik';
import { Form, Label } from 'semantic-ui-react';
import DatePicker, { ReactDatePickerProps } from "react-datepicker";

type Props = Partial<ReactDatePickerProps> & {
    label?: string;
};

export function CustomDateInput({label, ...props} : Props){
    const [field, meta, helpers] = useField(props.name!);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label> {label} </label>
            <DatePicker 
                {...field} 
                {...props} 
                onChange={value => helpers.setValue(value)}
                selected={( (field.value && new Date(field.value)) || null)}
            />
            {meta.touched && !!meta.error ? (
                <Label basic color='red' pointing style={{marginTop: '1em'}}>
                    {meta.error}
                </Label>
            ) : null}
        </Form.Field>
    );
}