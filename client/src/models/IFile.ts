export interface IFile {
    _id: string
    name: string,
    type: string,
    size: number,
    path: string,
    user: string,
    parent: string,
    date: string
}

export interface IFileUpload {
    id: string,
    name: string,
    progress: number
}