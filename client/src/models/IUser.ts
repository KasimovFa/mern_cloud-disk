export interface IUser {
    token:string,
    email:string,
    password:string, 
    diskSpace: number,
    usedSpace: number,
    files: any[],
    avatar: any
}