import React from 'react'
import { InventoryImport } from './Imports'
const { RoutesMap, BrandList, AddBrand, UpdateBrand, SubCategoryList, AddSubCategory, UpdateSubCategory, ItemList, AddItem, UpdateItem, MeasureUnitList, AddMeasureUnit, UpdateMeasureUnit, MeasureUnitTypeList, AddMeasureUnitType, UpdateMeasureUnitType, ProductPricingList, UpdateProductPricing, CustomerPricingList, UpdateCustomerPricing, CustomerCategoryPricingList, UpdateCustomerCategoryPricing, } = InventoryImport

const InventoryRoute = () => {
    return [
        {
            path: RoutesMap.BRAND_LIST.path,
            element: <BrandList />
        },
        {
            path: RoutesMap.ADD_BRAND.path,
            element: <AddBrand />
        },
        {
            path: RoutesMap.UPDATE_BRAND.path,
            element: <UpdateBrand />
        },


        {
            path: RoutesMap.SUB_CATEGORY_LIST.path,
            element: <SubCategoryList />
        },
        {
            path: RoutesMap.ADD_SUB_CATEGORY.path,
            element: <AddSubCategory />
        },
        {
            path: RoutesMap.UPDATE_SUB_CATEGORY.path,
            element: <UpdateSubCategory />
        },


        {
            path: RoutesMap.ITEM_LIST.path,
            element: <ItemList />
        },
        {
            path: RoutesMap.ADD_ITEM.path,
            element: <AddItem />
        },
        {
            path: RoutesMap.UPDATE_ITEM.path,
            element: <UpdateItem />
        },


        {
            path: RoutesMap.MEASURE_UNIT_LIST.path,
            element: <MeasureUnitList />
        },
        {
            path: RoutesMap.ADD_MEASURE_UNIT.path,
            element: <AddMeasureUnit />
        },
        {
            path: RoutesMap.UPDATE_MEASURE_UNIT.path,
            element: <UpdateMeasureUnit />
        },


        {
            path: RoutesMap.MEASURE_UNIT_TYPE_LIST.path,
            element: <MeasureUnitTypeList />
        },
        {
            path: RoutesMap.ADD_MEASURE_UNIT_TYPE.path,
            element: <AddMeasureUnitType />
        },
        {
            path: RoutesMap.UPDATE_MEASURE_UNIT_TYPE.path,
            element: <UpdateMeasureUnitType />
        },


        {
            path: RoutesMap.PRODUCT_PRICING_LIST.path,
            element: <ProductPricingList />
        },
        {
            path: RoutesMap.UPDATE_PRODUCT_PRICING.path,
            element: <UpdateProductPricing />
        },


        {
            path: RoutesMap.CUSTOMER_PRICING_LIST.path,
            element: <CustomerPricingList />
        },
        {
            path: RoutesMap.UPDATE_CUSTOMER_PRICING.path,
            element: <UpdateCustomerPricing />
        },


        {
            path: RoutesMap.CUSTOMER_CATEGORY_PRICING_LIST.path,
            element: <CustomerCategoryPricingList />
        },
        {
            path: RoutesMap.UPDATE_CUSTOMER_CATEGORY_PRICING.path,
            element: <UpdateCustomerCategoryPricing />
        },
    ]
}

export default InventoryRoute;