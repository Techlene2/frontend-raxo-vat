import React from 'react'
import { UserManagementImport } from './Imports'
const { RoutesMap, CurrencyList, AddCurrency, UpdateCurrency, CostCenterList, AddCostCenter, UpdateCostCenter, TaxList, AddTax, UpdateTax, TaxTypeList, AddTaxType, UpdateTaxType, SubMenuList, AddSubMenu, UpdateSubMenu, MainMenuList, AddMainMenu, UpdateMainMenu, CountryList, AddCountry, UpdateCountry, StateList, AddState, UpdateState, CityList, AddCity, UpdateCity, CompanyList, AddCompany, UpdateCompany, CompanyBusinessAreaList, AddCompanyBusinessArea, UpdateCompanyBusinessArea, BusinessAreaWareHouseList, AddBusinessAreaWareHouse, UpdateBusinessAreaWareHouse, RoleList, AddRole, UpdateRole, PermissionMenuList, AddPermissionMenu, UpdatePermissionMenu, UserRoleList, AddUserRole, UpdateUserRole, AssignRolePermission } = UserManagementImport

const UserManagementRoute = () => {
    return [
        {
            path: RoutesMap.CURRENCY_LIST.path,
            element: <CurrencyList />
        },
        {
            path: RoutesMap.ADD_CURRENCY.path,
            element: <AddCurrency />
        },
        {
            path: RoutesMap.UPDATE_CURRENCY.path,
            element: <UpdateCurrency />
        },


        {
            path: RoutesMap.COST_CENTRE_LIST.path,
            element: <CostCenterList />
        },
        {
            path: RoutesMap.ADD_COST_CENTRE.path,
            element: <AddCostCenter />
        },
        {
            path: RoutesMap.UPDATE_COST_CENTRE.path,
            element: <UpdateCostCenter />
        },


        {
            path: RoutesMap.TAX_LIST.path,
            element: <TaxList />
        },
        {
            path: RoutesMap.ADD_TAX.path,
            element: <AddTax />
        },
        {
            path: RoutesMap.UPDATE_TAX.path,
            element: <UpdateTax />
        },


        {
            path: RoutesMap.TAX_TYPE_LIST.path,
            element: <TaxTypeList />
        },
        {
            path: RoutesMap.ADD_TAX_TYPE.path,
            element: <AddTaxType />
        },
        {
            path: RoutesMap.UPDATE_TAX_TYPE.path,
            element: <UpdateTaxType />
        },


        {
            path: RoutesMap.SUB_MENU_LIST.path,
            element: <SubMenuList />
        },
        {
            path: RoutesMap.ADD_SUB_MENU.path,
            element: <AddSubMenu />
        },
        {
            path: RoutesMap.UPDATE_SUB_MENU.path,
            element: <UpdateSubMenu />
        },


        {
            path: RoutesMap.MAIN_MENU_LIST.path,
            element: <MainMenuList />
        },
        {
            path: RoutesMap.ADD_MENU.path,
            element: <AddMainMenu />
        },
        {
            path: RoutesMap.UPDATE_MENU.path,
            element: <UpdateMainMenu />
        },


        {
            path: RoutesMap.COUNTRY_LIST.path,
            element: <CountryList />
        },
        {
            path: RoutesMap.ADD_COUNTRY.path,
            element: <AddCountry />
        },
        {
            path: RoutesMap.UPDATE_COUNTRY.path,
            element: <UpdateCountry />
        },


        {
            path: RoutesMap.STATE_LIST.path,
            element: <StateList />
        },
        {
            path: RoutesMap.ADD_STATE.path,
            element: <AddState />
        },
        {
            path: RoutesMap.UPDATE_STATE.path,
            element: <UpdateState />
        },


        {
            path: RoutesMap.CITY_LIST.path,
            element: <CityList />
        },
        {
            path: RoutesMap.ADD_CITY.path,
            element: <AddCity />
        },
        {
            path: RoutesMap.UPDATE_CITY.path,
            element: <UpdateCity />
        },


        {
            path: RoutesMap.COMPANY_LIST.path,
            element: <CompanyList />
        },
        {
            path: RoutesMap.ADD_COMPANY.path,
            element: <AddCompany />
        },
        {
            path: RoutesMap.UPDATE_COMPANY.path,
            element: <UpdateCompany />
        },


        {
            path: RoutesMap.COMPANY_AREA_LIST.path,
            element: <CompanyBusinessAreaList />
        },
        {
            path: RoutesMap.ADD_COMPANY_AREA.path,
            element: <AddCompanyBusinessArea />
        },
        {
            path: RoutesMap.UPDATE_COMPANY_AREA.path,
            element: <UpdateCompanyBusinessArea />
        },


        {
            path: RoutesMap.WAREHOUSE_LIST.path,
            element: <BusinessAreaWareHouseList />
        },
        {
            path: RoutesMap.ADD_WAREHOUSE.path,
            element: <AddBusinessAreaWareHouse />
        },
        {
            path: RoutesMap.UPDATE_WAREHOUSE.path,
            element: <UpdateBusinessAreaWareHouse />
        },


        {
            path: RoutesMap.ROLE_LIST.path,
            element: <RoleList />
        },
        {
            path: RoutesMap.ADD_ROLE.path,
            element: <AddRole />
        },
        {
            path: RoutesMap.UPDATE_ROLE.path,
            element: <UpdateRole />
        },


        {
            path: RoutesMap.PERMISSION_MENU_LIST.path,
            element: <PermissionMenuList />
        },
        {
            path: RoutesMap.ADD_PERMISSION_MENU.path,
            element: <AddPermissionMenu />
        },
        {
            path: RoutesMap.UPDATE_PERMISSION_MENU.path,
            element: <UpdatePermissionMenu />
        },


        {
            path: RoutesMap.USER_ROLE_LIST.path,
            element: <UserRoleList />
        },
        {
            path: RoutesMap.ADD_USER_ROLE.path,
            element: <AddUserRole />
        },
        {
            path: RoutesMap.UPDATE_USER_ROLE.path,
            element: <UpdateUserRole />
        },


        {
            path: RoutesMap.ROLE_PERMISSION.path,
            element: <AssignRolePermission />
        },

    ]
}

export default UserManagementRoute;