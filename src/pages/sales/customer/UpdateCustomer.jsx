import React from 'react'
import { CustomerImport } from './Imports'
const { UpdateCustomerForm, lang } = CustomerImport

export default function UpdateCustomer() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.update + ' ' + lang.customer}</h6>
                        </div>
                    </div>
                </div>
            </div>

            <UpdateCustomerForm />
        </>
    )
}
