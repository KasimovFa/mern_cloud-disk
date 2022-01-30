import React from 'react';
import { useAppSelector } from '../../hooks/hooks';
import {Route, Routes, Navigate} from 'react-router-dom';
import { privateRoutes, publicRoutes,RouteNames } from '../../router';

const AppRouter = () => {
    const {isAuth} = useAppSelector(state => state.userReducer);
    return (
        isAuth ?
        <Routes>
        {
            privateRoutes.map((r,i) => {
                return (
                <Route
                    key = {i}
                    path = {r.path}
                    element={<r.component/>}
                />)
            })
        }
        <Route path = "*" element={<Navigate to={RouteNames.Disk} />}/>
      </Routes>
      :
        <Routes>
         {
            publicRoutes.map((r,i) => {
                return (
                    <Route
                        key = {i}
                        path = {r.path}
                        element={<r.component/>}
                    />)
            })
         }
         <Route path = "*" element={<Navigate to={RouteNames.LOGIN} />}/>
        </Routes>
    );
};

export default AppRouter;