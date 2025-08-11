import React from 'react';
import {ErrorMessage} from "./index";
import ImageInputList from "../ImageInputList";
import {useFormikContext} from "formik";

function FormImagePicker({name}) {
    const {errors, setFieldValue, touched, values} = useFormikContext()
    const imageUris = values[name]

    const handleAdd = (uri) => {
        setFieldValue(name, [...imageUris, uri])
    }

    const handleRemove = (uri) => {
        setFieldValue(name, imageUris.filter(imageUri => imageUri !== uri))
    }

    return (
        <>
            <ImageInputList imageUris={imageUris}
                            onAddImage={handleAdd}
                            onRemoveImage={handleRemove}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>

    );
}

export default FormImagePicker;
