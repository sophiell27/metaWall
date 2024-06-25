import { Outlet } from 'react-router-dom';
import Header from './Header';
import WallWrapper from '../../components/WallWrapper';
import { isTokenExpired } from './util';
import { useEffect, useState } from 'react';

const LayoutPage = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = window.sessionStorage.getItem('token');
            if (token) {
                const isExpired = isTokenExpired(token);
                if (!isExpired) {
                    setIsAuth(true);
                }
            }
        };
        checkAuth();
    }, []);
    return (
        <>
            <Header isAuth={isAuth} />
            <WallWrapper classname='pt-12'>{isAuth && <Outlet />}</WallWrapper>
        </>
    );
};
export default LayoutPage;
