// ProtectedRoute: Korunan rotalar için, oturum açılmamışsa login sayfasına yönlendirir
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {logout, refleshToken} from "../redux/datas/authSlice";
import {Navigate} from "react-router-dom";

export const ProtectedRoute = ({children}) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const expiration = useSelector((state) => state.auth.expiration);

    useEffect(() => {
        if (expiration) {
            const expirationDate = new Date(expiration);
            const currentDate = new Date();

            // Süresi dolmuşsa logout yap
            if (expirationDate < currentDate) {
                dispatch(logout());
            }/* else {
                // Süresi dolmadan hemen önce (örneğin 1 dakika) refresh token isteği yap
                const timeout = setTimeout(() => {
                    dispatch(refleshToken());
                }, expirationDate - currentDate - 60000); // Süre dolmadan 1 dakika önce token yenile

                return () => clearTimeout(timeout); // Bileşen unmount olduğunda timeout'u temizle
            }*/
        }
    }, [expiration, dispatch]);

    // Oturum yoksa login sayfasına yönlendir
    if (!token) {
        return <Navigate to="/login" replace/>;
    }

    return children;
};