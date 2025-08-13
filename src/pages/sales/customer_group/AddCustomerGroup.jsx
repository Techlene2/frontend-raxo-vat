import React from 'react'
import { CustomerGroupImport } from './Import.js'
const { AddCustomerGroupForm, lang } = CustomerGroupImport

export default function AddCustomerGroup() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.add + ' ' + lang.customer_group}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <AddCustomerGroupForm />
                    </div>
                </div>
            </div>
        </>
    )
}
