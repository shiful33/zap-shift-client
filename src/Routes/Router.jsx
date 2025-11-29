import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Home/Coverage";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../Pages/SendParcel";
import DashboardLayout from "../Layout/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels";
import AboutUs from "../Pages/AboutUs";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Payment from "../Pages/Dashboard/Payment";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess";
import PaymentCancelled from "../Pages/Dashboard/PaymentCancelled";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import Rider from "../Pages/Rider/Rider";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders";
import UsersManagement from "../Pages/Dashboard/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders";
import AssignedDeliveries from "../Pages/Dashboard/AssignedDeliveries";
import RiderRoute from "./RiderRoute";
import CompleteDeliveries from "../Pages/Dashboard/CompleteDeliveries";
import ParcelTrack from "../Pages/ParcelTrack";
import DashboardHome from "../Pages/Dashboard/DashboardHome";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: "rider",
            element: <PrivateRoute>
              <Rider />
            </PrivateRoute>,
            loader: () => fetch("/serviceCenters.json")
            .then(res => res.json())
        },
        {
            path: "send-parcel",
            element: <PrivateRoute>
              <SendParcel />
            </PrivateRoute>,
            loader: () => fetch("/serviceCenters.json")
            .then(res => res.json())
        },
        {
            path: "/coverage",
            Component: Coverage,
            loader: () => fetch("/serviceCenters.json")
            .then(res => res.json())
        },
        {
             path: "aboutUs",
             Component: AboutUs
        },
        {
             path: "parcel-track/:trackingId",
             Component: ParcelTrack
        },
    ]
    
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login

      },
      {
        path: "register",
        Component: Register
      },
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute>
             <DashboardLayout />
              </PrivateRoute>,
    children: [
      {
        path: "dashboard-home",
        Component: DashboardHome
      },
      {
        path: "my-parcels",
        Component: MyParcels
      },
      {
        path: 'payment/:parcelId',
        Component: Payment
      },
      {
         path: 'payment-history',
         Component: PaymentHistory
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      // Rider only routes
      {
        path: 'assigned-deliveries',
        element: <RiderRoute>
          <AssignedDeliveries />
        </RiderRoute>
      },
      {
        path: 'complete-deliveries',
        element: <RiderRoute>
          <CompleteDeliveries />
        </RiderRoute>
      },
      // Admin only routes
      {
        path: 'approve-riders',
        element: <AdminRoute>
          ApproveRiders
        </AdminRoute>
      },
      {
        path: 'assign-riders',
        element: <AdminRoute>
          <AssignRiders />
        </AdminRoute>
      },
      {
        path: 'users-management',
        element: <AdminRoute>
          UsersManagement
        </AdminRoute>
      },
    ]
  },
  {
    path: "*",
    Component: ErrorPage
  }
]);