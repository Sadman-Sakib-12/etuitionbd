import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Tuitions from "../Pages/Tuitions";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Tutors from "../Pages/Tutors";
import MainLoyouts from "../Layouts/MainLoyouts";
import DashboardLayout from "../Layouts/DashboardLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ProfileSettings from "../Pages/Dashboard/Common/ProfileSettings";
import PostNewTuition from "../Pages/Dashboard/Student/PostNewTuition";
import MyTuitions from "../Pages/Dashboard/Student/MyTuitions";
import AppliedTutors from "../Pages/Dashboard/Student/AppliedTutors";
import TuitionManagement from "../Pages/Dashboard/Admin/TuitionManagement";
import UserManagement from "../Pages/Dashboard/Admin/UserManagement";
import ReportsAnalytics from "../Pages/Dashboard/Admin/ReportsAnalytics";
import MyApplications from "../Pages/Dashboard/Tutor/MyApplications";
import OngoingTuition from "../Pages/Dashboard/Tutor/OngoingTuition";
import RevenueHistory from "../Pages/Dashboard/Tutor/RevenueHistory";


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
                path:'setting',
                element:<ProfileSettings/>
            },
            {
                path:'posttuition',
                element:<PostNewTuition/>
            },
            {
                path:'mytuitions',
                element:<MyTuitions/>
            },
            {
                path:'applietutors',
                element:<AppliedTutors/>
            },
            {
                path:'tuitionmanagement',
                element:<TuitionManagement/>
            },
            {
                path:'usermangement',
                element:<UserManagement/>
            },
            {
                path:'reportsanalytics',
                element:<ReportsAnalytics/>
            },
            {
                path:'myapplications',
                element:<MyApplications/>
            },
            {
                path:'ongoingtuition',
                element:<OngoingTuition/>
            },
            {
                path:'revenuehistory',
                element:<RevenueHistory/>
            }
        ]
    }


])
export default router;