import React from 'react'
import { CustomerImport } from './Imports'
const { AddCustomerForm, lang } = CustomerImport

export default function AddCustomer() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.add + ' ' + lang.customer}</h6>
                        </div>
                    </div>
                </div>
            </div>

            <AddCustomerForm />
        </>
    )
}
