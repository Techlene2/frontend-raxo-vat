import React from 'react'
import { HRImport } from './Imports'
const { RoutesMap, GroupTypeList, AddGroupType, UpdateGroupType, GroupList, AddGroup, UpdateGroup, DepartmentList, AddDepartment, UpdateDepartment, EmployeeList, AddEmployee, UpdateEmployee, UserList, UpdateUser, AddUser } = HRImport

const HRRoute = () => {
    return [
        {
            path: RoutesMap.GROUP_TYPE_LIST.path,
            element: <GroupTypeList />
        },
        {
            path: RoutesMap.ADD_GROUP_TYPE.path,
            element: <AddGroupType />
        },
        {
            path: RoutesMap.UPDATE_GROUP_TYPE.path,
            element: <UpdateGroupType />
        },


        {
            path: RoutesMap.GROUP_LIST.path,
            element: <GroupList />
        },
        {
            path: RoutesMap.ADD_GROUP.path,
            element: <AddGroup />
        },
        {
            path: RoutesMap.UPDATE_GROUP.path,
            element: <UpdateGroup />
        },


        {
            path: RoutesMap.DEPARTMENT_LIST.path,
            element: <DepartmentList />
        },
        {
            path: RoutesMap.ADD_DEPARTMENT.path,
            element: <AddDepartment />
        },
        {
            path: RoutesMap.UPDATE_DEPARTMENT.path,
            element: <UpdateDepartment />
        },


        {
            path: RoutesMap.EMPLOYEE_LIST.path,
            element: <EmployeeList />
        },
        {
            path: RoutesMap.ADD_EMPLOYEE.path,
            element: <AddEmployee />
        },
        {
            path: RoutesMap.UPDATE_EMPLOYEE.path,
            element: <UpdateEmployee />
        },


        {
            path: RoutesMap.USER_LIST.path,
            element: <UserList />
        },
        {
            path: RoutesMap.ADD_USER.path,
            element: <AddUser />
        },
        {
            path: RoutesMap.UPDATE_USER.path,
            element: <UpdateUser />
        },
    ]
}

export default HRRoute;