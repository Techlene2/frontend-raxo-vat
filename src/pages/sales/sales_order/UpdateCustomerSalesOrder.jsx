import React from 'react'
import { CustomerSalesOrderImport } from './Import'
const { UpdateCustomerSalesOrderForm, lang } = CustomerSalesOrderImport

export default function UpdateCustomerSalesOrder() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.update + ' ' + lang.sales_order}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <UpdateCustomerSalesOrderForm />
                    </div>
                </div>
            </div>
        </>
    )
}
