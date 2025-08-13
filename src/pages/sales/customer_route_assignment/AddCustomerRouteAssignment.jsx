import React from 'react'
import { CustomerRouteAssignmentImport } from './Import.js'
const { AddCustomerRouteAssignmentForm, lang } = CustomerRouteAssignmentImport

export default function AddCustomerRouteAssignment() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.add + ' ' + lang.customer_route_assignment}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <AddCustomerRouteAssignmentForm />
                    </div>
                </div>
            </div>
        </>
    )
}
