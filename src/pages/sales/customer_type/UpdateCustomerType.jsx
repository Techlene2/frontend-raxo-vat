import React from 'react'
import { CustomerTypeImport } from './Import.js'
const { UpdateCustomerTypeForm, lang } = CustomerTypeImport

export default function UpdateCustomerType() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.update + ' ' + lang.customer_type}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <UpdateCustomerTypeForm />
                    </div>
                </div>
            </div>
        </>
    )
}
