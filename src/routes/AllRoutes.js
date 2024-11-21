import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import HomeLayout from "../layout/HomeLayout";
import {routes} from "./Routes";
import {ProtectedRoute} from "./ProtectedRoute";
import {PublicRoute} from "./PublicRoute";

// Tüm rotaların ve layoutların yönetildiği bileşen
const AllRoutes = () => {
    // Layout seçimi: auth layout veya public layout
    const getLayout = (layout, children) => {
        switch (layout) {
            case "auth":
                return <AuthLayout>{children}</AuthLayout>;
            case "public":
            default:
                return <HomeLayout>{children}</HomeLayout>;
        }
    };

    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => {
                    const RouteComponent = route.isProtected ? ProtectedRoute : PublicRoute;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <RouteComponent>
                                    {getLayout(route.layout, route.element)}
                                </RouteComponent>
                            }
                        />
                    );
                })}
            </Routes>
        </BrowserRouter>
    );
};

export default AllRoutes;
