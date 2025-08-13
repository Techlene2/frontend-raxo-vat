import React from 'react'
import { CustomerRouteAssignmentImport } from './Import.js'
const { UpdateCustomerRouteAssignmentForm, lang } = CustomerRouteAssignmentImport

export default function UpdateCustomerRouteAssignment() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.update + ' ' + lang.customer_route_assignment}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <UpdateCustomerRouteAssignmentForm />
                    </div>
                </div>
            </div>
        </>
    )
}
