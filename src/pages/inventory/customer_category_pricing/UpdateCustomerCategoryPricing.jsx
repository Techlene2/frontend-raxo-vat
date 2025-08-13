import React from 'react'
import { CustomerCategoryPricingImport } from './Import'
const { CustomerCategoryPricingForm, lang } = CustomerCategoryPricingImport

export default function UpdateCustomerCategoryPricing() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.customer_cat_pricing}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <CustomerCategoryPricingForm />
                </div>
            </div>
        </div>
    )
}
