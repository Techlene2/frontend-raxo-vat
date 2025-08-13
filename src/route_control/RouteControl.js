import accessAuth from "./AuthControl"
import accessDashboard from "./DashboardControl";
import accessUserManagement from "./UserManagementControl";
import accessPurchase from "./PurchaseControl";
import accessSales from "./SalesControl";
import accessHR from "./HRControl";
import accessInventory from "./InventoryControl";

const RoutesMap = {
    ...accessAuth,
    ...accessDashboard,
    ...accessUserManagement,
    ...accessPurchase,
    ...accessSales,
    ...accessHR,
    ...accessInventory,
}

export default RoutesMap;