import React from 'react'
import { CustomerCategoryImport } from './Import.js'
const { AddCustomerCategoryForm, lang } = CustomerCategoryImport

export default function AddCustomerCategory() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.add + ' ' + lang.customer_category}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <AddCustomerCategoryForm />
                    </div>
                </div>
            </div>
        </>
    )
}
