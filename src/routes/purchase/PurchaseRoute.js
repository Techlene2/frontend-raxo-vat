import React from 'react'
import { PurchaseImport } from './Imports'
const { RoutesMap, VendorList, AddVendor, UpdateVendor } = PurchaseImport

const PurchaseRoute = () => {
    return [
        {
            path: RoutesMap.VENDOR_LIST.path,
            element: <VendorList />
        },
        {
            path: RoutesMap.ADD_VENDOR.path,
            element: <AddVendor />
        },
        {
            path: RoutesMap.UPDATE_VENDOR.path,
            element: <UpdateVendor />
        },
    ]
}

export default PurchaseRoute;