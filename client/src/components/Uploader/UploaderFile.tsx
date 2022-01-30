import React from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { IFileUpload } from '../../models/IFile';
import { deleteUpLoadFile} from '../../store/reducers/UploaderSlice';
import './uploader.scss';

export interface PropsTypeFile {
    file: IFileUpload
 }

const UploaderFile = ({file}:PropsTypeFile) => {
    const dispatch = useAppDispatch();

    return (
        <div className="upload-file">
        <div className="upload-file__header">
            <div className="upload-file__name">{file.name}</div>
            <button className="upload-file__remove" onClick={() => dispatch(deleteUpLoadFile(file.id))}>X</button>
        </div>
        <div className="upload-file__progress-bar">
            <div className="upload-file__upload-bar" style={{width: file.progress + "%"}}/>
            <div className="upload-file__percent">{file.progress}%</div>
        </div>
    </div>
    );
};

export default UploaderFile;