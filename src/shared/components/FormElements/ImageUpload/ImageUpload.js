import React, { useRef, useState, useEffect } from 'react';

import Button from '../Button/Button';

import './ImageUpload.css';

const ImageUpload = (props) => {
    const [ files, setFiles ] = useState(null); // The FileList ("event.target.files") from onchange event of an <input type="file"/>
    const [ previewUrl, setPreviewUrl ] = useState('');
    const filePickerRef = useRef();

    /* Register an effect to run when files changes. Used to display preview image.*/
    useEffect(() => {
        if (!files || !files[0]) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(files[0]);
    }, [files]);

    const pickImageHandler = () => {
        // simulate a click event on the <input type="file"/>. Opens the file picker.
        filePickerRef.current.click();
    };

    const pickedHandler = (event) => {
        const fileList = event.target.files;
        if (fileList) {
            setFiles(fileList);
            if (props.onInput && typeof props.onInput === 'function') {
                props.onInput(props.name, fileList);
            }
        }
    };

    return (
        <div className={`form-control ${props.isTouched && !props.isValid && 'form-control--invalid'}`}>
            <input
                id={props.id}
                name={props.name}
                ref={filePickerRef}
                style={{display: 'none'}}
                type="file"
                accept={props.accept}
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview">
                    { previewUrl && <img src={previewUrl} alt="preview"/> }
                    { !previewUrl && <p>Please pick an image.</p> }
                </div>
                <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
            </div>
            { props.isTouched && !props.isValid && <p>{props.errorMessage || 'File must be a valid image.' }</p> }
        </div>
    );
};

export default ImageUpload;