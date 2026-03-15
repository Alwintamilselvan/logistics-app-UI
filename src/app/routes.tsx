import { createBrowserRouter } from "react-router";
import { DriverLogin } from "./pages/driver/DriverLogin";
import { DriverDashboard } from "./pages/driver/DriverDashboard";
import { DeliveryList } from "./pages/driver/DeliveryList";
import { DeliveryDetails } from "./pages/driver/DeliveryDetails";
import { DeliveryAction } from "./pages/driver/DeliveryAction";
import { ProofOfDelivery } from "./pages/driver/ProofOfDelivery";
import { DeliveryConfirmation } from "./pages/driver/DeliveryConfirmation";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ShipmentsTable } from "./pages/admin/ShipmentsTable";
import { DriverManagement } from "./pages/admin/DriverManagement";
import { PODViewer } from "./pages/admin/PODViewer";
import { LandingPage } from "./pages/LandingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  // Driver routes
  {
    path: "/driver/login",
    Component: DriverLogin,
  },
  {
    path: "/driver/dashboard",
    Component: DriverDashboard,
  },
  {
    path: "/driver/deliveries",
    Component: DeliveryList,
  },
  {
    path: "/driver/delivery/:id",
    Component: DeliveryDetails,
  },
  {
    path: "/driver/delivery/:id/action",
    Component: DeliveryAction,
  },
  {
    path: "/driver/delivery/:id/proof",
    Component: ProofOfDelivery,
  },
  {
    path: "/driver/delivery/:id/confirmation",
    Component: DeliveryConfirmation,
  },
  // Admin routes
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/admin/shipments",
    Component: ShipmentsTable,
  },
  {
    path: "/admin/drivers",
    Component: DriverManagement,
  },
  {
    path: "/admin/pod/:id",
    Component: PODViewer,
  },
]);
