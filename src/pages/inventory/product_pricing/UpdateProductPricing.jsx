import React from 'react'
import { ProductPricingImport } from './Import'
const { ProductPricingForm, lang } = ProductPricingImport

export default function UpdateProductPricing() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.product_pricing}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <ProductPricingForm />
                </div>
            </div>
        </div>
    )
}
