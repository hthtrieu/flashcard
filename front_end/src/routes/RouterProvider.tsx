import { routerPaths } from './path';
import { useSelector, useDispatch } from 'react-redux'
import { Suspense, useEffect, useState } from 'react';
import { publicRoutes, protectedRoutes } from './MainRouters'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import { getProfileAction, getAccessTokenByRefreshTokenAction } from '@/redux/auth/slice';
const RouterProvider = () => {
    // const dispatch = useDispatch();
    // const { token } = useSelector((state: any) => state.Auth);
    // const { profile } = useSelector((state: any) => state.Auth);
    // const [canAccess, setCanAccess] = useState(false);
    // const getProfileByAccessToken = () => {
    //     dispatch(getProfileAction({
    //         onSuccess: (data: any) => {
    //             if (data) {
    //                 setCanAccess(true);
    //             }
    //         }
    //     }))
    // }
    // const getAccessTokenByRefreshToken = () => {
    //     // get refresh token from local storage
    //     // if refresh token is not available, redirect to login page
    //     // if refresh token is available, dispatch getAccessTokenByRefreshTokenActionSuccess
    //     // if getAccessTokenByRefreshTokenActionSuccess is success, set canAccess to true
    // }
    // useEffect(() => {
    //     if (!profile) {

    //         getProfileByAccessToken();
    //     }
    //     if (!canAccess) {
    //         console.log(canAccess, "canAccess")
    //         getAccessTokenByRefreshToken();
    //     }
    //     if (profile) {
    //         setCanAccess(true);
    //     }
    // }, [])
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    {publicRoutes.map((route: any, index: number) => {
                        const Page = route.component;
                        const Layout = route.layout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {protectedRoutes.map((route: any, index: number) => {
                        const Page = route.component;
                        const Layout = route.layout;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    true ? (
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    ) : (
                                        <Navigate to={routerPaths.HOME} replace={true} />
                                    )
                                }
                            />
                        );
                    })}
                </Routes>
            </Suspense>
        </Router >
    )
}

export default RouterProvider