import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Navbar from "../Pages/Navbar";
import Tuitions from "../Pages/Tuitions";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Tutors from "../Pages/Tutors";
import MainLoyouts from "../Layouts/MainLoyouts";
import DashboardLayout from "../Layouts/DashboardLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLoyouts />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/tuitions',
                element: <Tuitions />
            },

            {
                path: '/About',
                element: <About />
            },
            {
                path: '/Contact',
                element: <Contact />
            },
            {
                path: '/tutors',
                element: <Tutors />
            },
            // {
            //     path: '/',
            //     element: <Navbar />
            // },
        ]
    },

    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/regiter',
        element: <Register/>
    },

    {
        path: '/dashboard',
        element: (<DashboardLayout />),
        children: [
            {
                path: '',
                // element:<Sakib/>
            }
        ]
    }


])
export default router;