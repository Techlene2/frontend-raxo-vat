import React from 'react'
import { CustomerPricingImport } from './Import'
const { CustomerPricingForm, lang } = CustomerPricingImport

export default function UpdateCustomerPricing() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.customer_pricing}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <CustomerPricingForm />
                </div>
            </div>
        </div>
    )
}
