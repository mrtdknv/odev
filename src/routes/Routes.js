import WelcomeScreen from "../page/welcome/WelcomeScreen";
import Login from "../page/auth/Login";
import Register from "../page/auth/Register";
import HomeScreen from "../page/home/HomeScreen";
import CompanyScreen from "../page/company/CompanyScreen";
import CompanyCreate from "../page/company/CompanyCreate";
import CompanyDetail from "../page/company/CompanyDetail";
import UserProfile from "../page/profile/UserProfile";
import NotFound from "../page/notfound/NotFound";
import MyCompanyProfile from "../page/profile/MyCompanyProfile";

export const routes = [
    {
        path: "/",
        element: <WelcomeScreen/>,
        layout: "public",
        isProtected: false
    },
    {
        path: "/welcome",
        element: <WelcomeScreen/>,
        layout: "auth",
        isProtected: true
    },
    {
        path: "/login",
        element: <Login/>,
        layout: "public",
        isProtected: false
    },
    {
        path: "/register",
        element: <Register/>,
        layout: "public",
        isProtected: false
    },
    {
        path: "/home",
        element: <HomeScreen/>,
        layout: "auth",
        isProtected: true
    },
    {
        path: "/company",
        element: <CompanyScreen/>,
        layout: "auth",
        isProtected: true
    },
    {
        path: "/companyprofile/:id",
        element: <CompanyDetail/>,
        layout: "auth",
        isProtected: true
    },
    {
        path: "/companies",
        element: <CompanyScreen/>,
        layout: "public",
        isProtected: false
    },
    {
        path: "/companydetail/:id",
        element: <CompanyDetail/>,
        layout: "public",
        isProtected: false
    },
    {
        path: "/companycreate",
        element: <CompanyCreate/>,
        layout: "auth",
        isProtected: true
    },

    {
        path: "/profile",
        element: <UserProfile/>,
        layout: "auth",
        isProtected: true
    },
    {
        path: "/mycompany",
        element: <MyCompanyProfile/>,
        layout: "auth",
        isProtected: true
    },
    {
        path: "/*",
        element: <NotFound/>,
        layout: "public",
        isProtected: false
    }
];