import React, { useEffect } from 'react';
import UploadFile from "./UploaderFile";
import './uploader.scss'
import {useDispatch} from "react-redux";
import { useAppSelector } from '../../hooks/hooks';
import { hideUpLoader } from '../../store/reducers/UploaderSlice';


const Uploader = () => {
    const files = useAppSelector(state => state.uploadreducer.files);
    const isVisible = useAppSelector(state => state.uploadreducer.isVisable);
    const dispatch = useDispatch();
    

    return (isVisible ?
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Загрузки</div>
                <button className="uploader__close" onClick={() => dispatch(hideUpLoader())}>X</button>
            </div>
            {files.map(file =>
                <UploadFile key={file.id} file = {file} />
            )}
        </div>
        :
        null
    );
};

export default Uploader;