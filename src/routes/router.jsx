import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import Tuitions from "../Pages/Tuitions";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Tutors from "../Pages/Tutors";
import MainLoyouts from "../Layouts/MainLoyouts";
import DashboardLayout from "../Layouts/DashboardLayout";
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
import Error from "../Pages/Error";
import Login from "../Pages/Login";
import PaymentSuccess from "../Pages/Dashboard/Payment/PaymentSucces";
import ViewProfile from "../componet/ViewProfile";
import PaymentHistory from "../Pages/Dashboard/Payment/PaymentHistory";
import PrivateRouter from "../Providers/PrivateRouter";
import Adminroute from "./Adminroute";


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
                path: '/tutor/:id',
                element: <ViewProfile />
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
        element: <Register />
    },

    {
        path: '*',
        element: <Error />
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRouter>
                <DashboardLayout />
            </PrivateRouter>
        ),
        children: [
            {
                path: 'setting',
                element: (<PrivateRouter><ProfileSettings /></PrivateRouter>)
            },
            {
                path: 'posttuition',
                element: (<PrivateRouter><PostNewTuition /></PrivateRouter>)
            },
            {
                path: 'mytuitions',
                element: (<PrivateRouter><MyTuitions /></PrivateRouter>)
            },
            {
                path: 'applietutors',
                element: (<PrivateRouter><AppliedTutors /></PrivateRouter>)
            },
            {
                path: 'tuitionmanagement',
                element: (
                    <PrivateRouter>
                        <Adminroute>
                            <TuitionManagement />
                        </Adminroute>
                    </PrivateRouter>)
            },
            {
                path: 'usermangement',
                element: (
                    <PrivateRouter>
                        <Adminroute>
                            <UserManagement />
                        </Adminroute>
                    </PrivateRouter>)
            },
            {
                path: 'payment-success',
                element: (<PrivateRouter> <PaymentSuccess /></PrivateRouter>)
            },
            {
                path: 'reportsanalytics',
                element: (
                    <PrivateRouter>
                        <Adminroute>
                            <ReportsAnalytics />
                        </Adminroute>
                    </PrivateRouter>)
            },
            {
                path: 'payment',
                element: (<PrivateRouter><PaymentHistory /></PrivateRouter>)
            },
            {
                path: 'myapplications',
                element: (<PrivateRouter><MyApplications /></PrivateRouter>)
            },
            {
                path: 'ongoingtuition',
                element: (<PrivateRouter><OngoingTuition /></PrivateRouter>)
            },
            {
                path: 'revenuehistory',
                element: (<PrivateRouter><RevenueHistory /></PrivateRouter>)
            }
        ]

    }


])
export default router;