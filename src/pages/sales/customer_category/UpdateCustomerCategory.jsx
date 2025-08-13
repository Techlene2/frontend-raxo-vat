import React from 'react'
import { CustomerCategoryImport } from './Import.js'
const { UpdateCustomerCategoryForm, lang } = CustomerCategoryImport

export default function UpdateCustomerCategory() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.update + ' ' + lang.customer_category}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <UpdateCustomerCategoryForm />
                    </div>
                </div>
            </div>
        </>
    )
}
