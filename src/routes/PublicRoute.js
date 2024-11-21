// PublicRoute: Public rotalar için, oturum açılmışsa company sayfasına yönlendirir
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

export const PublicRoute = ({children}) => {
    const token = useSelector((state) => state.auth.token);

    if (token) {
        return <Navigate to="/home" replace/>;
    }

    return children;
};