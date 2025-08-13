import { configureStore } from "@reduxjs/toolkit"
import CustomerList from "./slices/sales/customer/CustomerList";
import CustomerDetails from "./slices/sales/customer/CustomerDetails";
import CustomerDispatchDetails from "./slices/sales/customer/CustomerDispatchDetails";
import CountryList from "./slices/user_management/country/CountryList";
import CountryDetails from "./slices/user_management/country/CountryDetails";
import StateList from "./slices/user_management/state/StateList";
import StateDetails from "./slices/user_management/state/StateDetails";
import StatebyCountry from "./slices/user_management/state/StatebyCountry";
import CityList from "./slices/user_management/city/CityList";
import CityDetails from "./slices/user_management/city/CityDetails";
import CitybyState from "./slices/user_management/city/CitybyState";
import Sidebar from "./slices/assets/Sidebar";
import MenuList from "./slices/user_management/menu/MenuList";
import MenuDetails from "./slices/user_management/menu/MenuDetails";
import SubMenu from "./slices/user_management/sub_menu/SubMenu";
import SubMenuList from "./slices/user_management/sub_menu/SubMenuList";
import SubMenuDetails from "./slices/user_management/sub_menu/SubMenuDetails";
import SubMenuByMenu from "./slices/user_management/sub_menu/SubMenuByMenu";
import RoleList from "./slices/user_management/role/RoleList";
import RoleDetails from "./slices/user_management/role/RoleDetails";
import CategoryList from "./slices/sales/category/CategoryList";
import CategoryDetails from "./slices/sales/category/CategoryDetails";
import PermissionMenuList from "./slices/user_management/permission_menu/PermissionMenuList";
import PermissionMenuDetails from "./slices/user_management/permission_menu/PermissionMenuDetails";
import DepartmentList from "./slices/hr/department/DepartmentList";
import DepartmentDetails from "./slices/hr/department/DepartmentDetails";
import MeasureUnitTypeList from "./slices/inventory/measure_unit_type/MeasureUnitTypeList";
import MeasureUnitTypeDetails from "./slices/inventory/measure_unit_type/MeasureUnitTypeDetails";
import MeasureUnitList from "./slices/inventory/measure_unit/MeasureUnitList";
import MeasureUnitDetails from "./slices/inventory/measure_unit/MeasureUnitDetails";
import TaxTypeList from "./slices/user_management/tax_type/TaxTypeList";
import TaxTypeDetails from "./slices/user_management/tax_type/TaxTypeDetails";
import GroupTypeList from "./slices/hr/group_type/GroupTypeList";
import GroupTypeDetails from "./slices/hr/group_type/GroupTypeDetails";
import TaxList from "./slices/user_management/tax/TaxList";
import TaxDetails from "./slices/user_management/tax/TaxDetails";
import VendorList from "./slices/purchase/vendor/VendorList";
import VendorDetails from "./slices/purchase/vendor/VendorDetails";
import GroupList from "./slices/hr/group/GroupList";
import GroupDetails from "./slices/hr/group/GroupDetails";
import ItemList from "./slices/inventory/item/ItemList";
import ItemDetails from "./slices/inventory/item/ItemDetails";
import SubCategoryList from "./slices/inventory/sub_category/SubCategoryList";
import SubCategoryDetails from "./slices/inventory/sub_category/SubCategoryDetails";
import CostCenterList from "./slices/user_management/cost_center/CostCenterList";
import CostCenterDetails from "./slices/user_management/cost_center/CostCenterDetails";
import BrandList from "./slices/inventory/brand/BrandList";
import BrandDetails from "./slices/inventory/brand/BrandDetails";
import CurrencyList from "./slices/user_management/currency/CurrencyList";
import CurrencyDetails from "./slices/user_management/currency/CurrencyDetails";
import CompanyList from "./slices/user_management/company/CompanyList";
import CompanyDetails from "./slices/user_management/company/CompanyDetails";
import CompanyBusinessAreaList from "./slices/user_management/company_business_area/CompanyBusinessAreaList";
import CompanyBusinessAreaDetails from "./slices/user_management/company_business_area/CompanyBusinessAreaDetails";
import WareHouseList from "./slices/user_management/business_area_ware_house/WareHouseList";
import WareHouseDetails from "./slices/user_management/business_area_ware_house/WareHouseDetails";
import SubCatbyCat from "./slices/inventory/sub_category/SubCatbyCat";
import ColorList from "./slices/color/ColorList";
import SegmentList from "./slices/segment/SegmentList";
import RackList from "./slices/rack/RackList";
import RoutesList from "./slices/sales/routes/RoutesList";
import RoutesDetails from "./slices/sales/routes/RoutesDetails";
import EmployeeList from "./slices/hr/employee/EmployeeList";
import EmployeeDetails from "./slices/hr/employee/EmployeeDetails";
import RoutesPosition from "./slices/sales/routes/RoutesPosition";
import CustomerGroupList from "./slices/sales/customer_group/CustomerGroupList";
import CustomerGroupDetails from "./slices/sales/customer_group/CustomerGroupDetails";
import CustomerTypeList from "./slices/sales/customer_type/CustomerTypeList";
import CustomerTypeDetails from "./slices/sales/customer_type/CustomerTypeDetails";
import GradeList from "./slices/sales/grade/GradeList";
import GradeDetails from "./slices/sales/grade/GradeDetails";
import RegionList from "./slices/sales/region/RegionList";
import RegionDetails from "./slices/sales/region/RegionDetails";
import RolePermissionByRole from "./slices/user_management/role_permission/RolePermissionByRole";
import UserList from "./slices/hr/user/UserList";
import UserDetails from "./slices/hr/user/UserDetails";
import UserRoleList from "./slices/user_management/user_role/UserRoleList";
import UserRoleDetails from "./slices/user_management/user_role/UserRoleDetails";
import SalesOrderList from "./slices/sales/sales_order/SalesOrderList";
import CustomerRouteAssignmentList from "./slices/sales/customer_route_assignment/CustomerRouteAssignmentList";
import CustomerRouteAssignmentDetails from "./slices/sales/customer_route_assignment/CustomerRouteAssignmentDetails";
import SalesOrderDetails from "./slices/sales/sales_order/SalesOrderDetails";
import SalesOrderRoutesList from "./slices/sales/sales_order/SalesOrderRoutesList";
import ProductPricingWithFilters from "./slices/sales/sales_order/ProductPricingWithFilters";
import VehicleList from "./slices/sales/vehicle/VehicleList";
import VehicleDetails from "./slices/sales/vehicle/VehicleDetails";
import DriverList from "./slices/sales/driver/DriverList";
import DriverDetails from "./slices/sales/driver/DriverDetails";
import DispatchPlanningList from "./slices/sales/dispatch_planning/DispatchPlanningList";
import DispatchPlanningDetails from "./slices/sales/dispatch_planning/DispatchPlanningDetails";
import ProductPricingFilter from "./slices/inventory/product_pricing/ProductPricingFilter";
import ProductPricingList from "./slices/inventory/product_pricing/ProductPricingList";
import CustomerPricingList from "./slices/inventory/customer_pricing/CustomerPricingList";
import CustomerPricingFilter from "./slices/inventory/customer_pricing/CustomerPricingFilter";
import CustomerCategoryList from "./slices/sales/customer_category/CustomerCategoryList";
import CustomerCategoryDetails from "./slices/sales/customer_category/CustomerCategoryDetails";
import CustomerCategoryPricingList from "./slices/inventory/customer_category_pricing/CustomerCategoryPricingList";
import CustomerCategoryPricingFilter from "./slices/inventory/customer_category_pricing/CustomerCategoryPricingFilter";

const ERP_Store = configureStore({
    reducer: {
        sidebar: Sidebar,

        menuList: MenuList,
        menuDetails: MenuDetails,

        subMenu: SubMenu,
        subMenuList: SubMenuList,
        subMenuDetails: SubMenuDetails,
        subMenubyMenu: SubMenuByMenu,

        customerList: CustomerList,
        customerDetails: CustomerDetails,
        customerDispatchDetails: CustomerDispatchDetails,

        countryList: CountryList,
        countryDetails: CountryDetails,

        stateList: StateList,
        stateDetails: StateDetails,
        statebyCountry: StatebyCountry,

        cityList: CityList,
        cityDetails: CityDetails,
        citybyState: CitybyState,

        roleList: RoleList,
        roleDetails: RoleDetails,

        categoryList: CategoryList,
        categoryDetails: CategoryDetails,

        permissionMenuList: PermissionMenuList,
        permissionMenuDetails: PermissionMenuDetails,

        departmentList: DepartmentList,
        departmentDetails: DepartmentDetails,

        measureUnitTypeList: MeasureUnitTypeList,
        measureUnitTypeDetails: MeasureUnitTypeDetails,

        measureUnitList: MeasureUnitList,
        measureUnitDetails: MeasureUnitDetails,

        taxTypeList: TaxTypeList,
        taxTypeDetails: TaxTypeDetails,

        taxList: TaxList,
        taxDetails: TaxDetails,

        groupTypeList: GroupTypeList,
        groupTypeDetails: GroupTypeDetails,

        groupList: GroupList,
        groupDetails: GroupDetails,

        vendorList: VendorList,
        vendorDetails: VendorDetails,

        itemList: ItemList,
        itemDetails: ItemDetails,

        subCategoryList: SubCategoryList,
        subCategoryDetails: SubCategoryDetails,
        subCatbyCat: SubCatbyCat,

        costCenterList: CostCenterList,
        costCenterDetails: CostCenterDetails,

        brandList: BrandList,
        brandDetails: BrandDetails,

        currencyList: CurrencyList,
        currencyDetails: CurrencyDetails,

        companyList: CompanyList,
        companyDetails: CompanyDetails,

        companyBusinessAreaList: CompanyBusinessAreaList,
        companyBusinessAreaDetails: CompanyBusinessAreaDetails,

        wareHouseList: WareHouseList,
        wareHouseDetails: WareHouseDetails,

        colorList: ColorList,
        segmentList: SegmentList,
        rackList: RackList,

        routesList: RoutesList,
        routeDetails: RoutesDetails,
        routePosition: RoutesPosition,

        employeeList: EmployeeList,
        employeeDetails: EmployeeDetails,

        customerGroupList: CustomerGroupList,
        customerGroupDetails: CustomerGroupDetails,

        customerTypeList: CustomerTypeList,
        customerTypeDetails: CustomerTypeDetails,

        gradeList: GradeList,
        gradeDetails: GradeDetails,

        regionList: RegionList,
        regionDetails: RegionDetails,

        rolePermisssionByRole: RolePermissionByRole,

        userList: UserList,
        userDetails: UserDetails,

        userRoleList: UserRoleList,
        userRoleDetails: UserRoleDetails,

        customerRouteAssignmentList: CustomerRouteAssignmentList,
        customerRouteAssignmentDetails: CustomerRouteAssignmentDetails,

        salesOrderList: SalesOrderList,
        salesOrderDetails: SalesOrderDetails,
        salesOrderRouteList: SalesOrderRoutesList,
        productPricingWithFilter: ProductPricingWithFilters,

        vehicleList: VehicleList,
        vehicleDetails: VehicleDetails,

        driverList: DriverList,
        driverDetails: DriverDetails,

        dispatchPlanningList: DispatchPlanningList,
        dispatchPlanningDetails: DispatchPlanningDetails,

        productPricingList: ProductPricingList,
        productPricingFilter: ProductPricingFilter,

        customerPricingList: CustomerPricingList,
        customerPricingFilter: CustomerPricingFilter,

        customerCategoryList: CustomerCategoryList,
        customerCategoryDetails: CustomerCategoryDetails,

        customerCategoryPricingList: CustomerCategoryPricingList,
        customerCategoryPricingFilter: CustomerCategoryPricingFilter,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default ERP_Store;