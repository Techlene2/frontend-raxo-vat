import React from 'react'
import { SalesImport } from './Imports'
const { RoutesMap, RegionList, AddRegion, UpdateRegion, GradeList, AddGrade, UpdateGrade, CustomerGroupList, AddCustomerGroup, UpdateCustomerGroup, CustomerTypeList, AddCustomerType, UpdateCustomerType, CustomerList, AddCustomer, UpdateCustomer, CustomerDetails, CategoryList, AddCategory, UpdateCategory, RoutesList, AddRoutes, UpdateRoutes, RouteDetails, CustomerRouteAssignmentList, AddCustomerRouteAssignment, UpdateCustomerRouteAssignment, CustomerSalesOrderList, AddCustomerSalesOrder, UpdateCustomerSalesOrder, SalesOrderRoutePlanning, VehicleList, AddVehicle, UpdateVehicle, DriverList, AddDriver, UpdateDriver, ProductPricing, DispatchPlanningList, AddDispatchPlanning, UpdateDispatchPlanning, CustomerCategoryList, AddCustomerCategory, UpdateCustomerCategory } = SalesImport

const SalesRoute = () => {
    return [
        {
            path: RoutesMap.REGION_LIST.path,
            element: <RegionList />
        },
        {
            path: RoutesMap.ADD_REGION.path,
            element: <AddRegion />
        },
        {
            path: RoutesMap.UPDATE_REGION.path,
            element: <UpdateRegion />
        },


        {
            path: RoutesMap.GRADE_LIST.path,
            element: <GradeList />
        },
        {
            path: RoutesMap.ADD_GRADE.path,
            element: <AddGrade />
        },
        {
            path: RoutesMap.UPDATE_GRADE.path,
            element: <UpdateGrade />
        },


        {
            path: RoutesMap.CUSTOMER_TYPE_LIST.path,
            element: <CustomerTypeList />
        },
        {
            path: RoutesMap.ADD_CUSTOMER_TYPE.path,
            element: <AddCustomerType />
        },
        {
            path: RoutesMap.UPDATE_CUSTOMER_TYPE.path,
            element: <UpdateCustomerType />
        },


        {
            path: RoutesMap.CUSTOMER_GROUP_LIST.path,
            element: <CustomerGroupList />
        },
        {
            path: RoutesMap.ADD_CUSTOMER_GROUP.path,
            element: <AddCustomerGroup />
        },
        {
            path: RoutesMap.UPDATE_CUSTOMER_GROUP.path,
            element: <UpdateCustomerGroup />
        },


        {
            path: RoutesMap.CUSTOMER_LIST.path,
            element: <CustomerList />
        },
        {
            path: RoutesMap.ADD_CUSTOMER.path,
            element: <AddCustomer />
        },
        {
            path: RoutesMap.UPDATE_CUSTOMER.path,
            element: <UpdateCustomer />
        },
        {
            path: RoutesMap.CUSTOMER_DETAILS.path,
            element: <CustomerDetails />
        },


        {
            path: RoutesMap.CATEGORY_LIST.path,
            element: <CategoryList />
        },
        {
            path: RoutesMap.ADD_CATEGORY.path,
            element: <AddCategory />
        },
        {
            path: RoutesMap.UPDATE_CATEGORY.path,
            element: <UpdateCategory />
        },


        {
            path: RoutesMap.ROUTES_LIST.path,
            element: <RoutesList />
        },
        {
            path: RoutesMap.ADD_ROUTES.path,
            element: <AddRoutes />
        },
        {
            path: RoutesMap.UPDATE_ROUTES.path,
            element: <UpdateRoutes />
        },
        {
            path: RoutesMap.ROUTES_DETAILS.path,
            element: <RouteDetails />
        },


        {
            path: RoutesMap.ADD_CUSTOMER_ROUTE_ASSIGNMENT.path,
            element: <AddCustomerRouteAssignment />
        },
        {
            path: RoutesMap.UPDATE_CUSTOMER_ROUTE_ASSIGNMENT.path,
            element: <UpdateCustomerRouteAssignment />
        },
        {
            path: RoutesMap.CUSTOMER_ROUTE_ASSIGNMENT_LIST.path,
            element: <CustomerRouteAssignmentList />
        },


        {
            path: RoutesMap.CUSTOMER_SALES_ORDER_LIST.path,
            element: <CustomerSalesOrderList />
        },
        {
            path: RoutesMap.ADD_CUSTOMER_SALES_ORDER.path,
            element: <AddCustomerSalesOrder />
        },
        {
            path: RoutesMap.UPDATE_CUSTOMER_SALES_ORDER.path,
            element: <UpdateCustomerSalesOrder />
        },
        {
            path: RoutesMap.SALES_ORDER_ROUTE_PLANNING.path,
            element: <SalesOrderRoutePlanning />
        },


        {
            path: RoutesMap.VEHICLE_LIST.path,
            element: <VehicleList />
        },
        {
            path: RoutesMap.ADD_VEHICLE.path,
            element: <AddVehicle />
        },
        {
            path: RoutesMap.UPDATE_VEHICLE.path,
            element: <UpdateVehicle />
        },


        {
            path: RoutesMap.DRIVER_LIST.path,
            element: <DriverList />
        },
        {
            path: RoutesMap.ADD_DRIVER.path,
            element: <AddDriver />
        },
        {
            path: RoutesMap.UPDATE_DRIVER.path,
            element: <UpdateDriver />
        },


        {
            path: RoutesMap.DISPATCH_PLANNING_LIST.path,
            element: <DispatchPlanningList />
        },
        {
            path: RoutesMap.ADD_DISPATCH_PLANNING.path,
            element: <AddDispatchPlanning />
        },
        {
            path: RoutesMap.UPDATE_DISPATCH_PLANNING.path,
            element: <UpdateDispatchPlanning />
        },


        {
            path: RoutesMap.CUSTOMER_CATEGORY_LIST.path,
            element: <CustomerCategoryList />
        },
        {
            path: RoutesMap.ADD_CUSTOMER_CATEGORY.path,
            element: <AddCustomerCategory />
        },
        {
            path: RoutesMap.UPDATE_CUSTOMER_CATEGORY.path,
            element: <UpdateCustomerCategory />
        },
    ]
}

export default SalesRoute;