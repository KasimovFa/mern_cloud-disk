import Disk from "../pages/Disk/Disk"
import AuthPage from "../pages/RegAuth/AuthPage"
import Registration from "../pages/RegAuth/Registration"

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN ='/login',
    REG = '/registration',
    Disk = '/'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.REG, exact: true, component: Registration},
    {path: RouteNames.LOGIN, exact: true, component: AuthPage},
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.Disk, exact: true, component: Disk}
]