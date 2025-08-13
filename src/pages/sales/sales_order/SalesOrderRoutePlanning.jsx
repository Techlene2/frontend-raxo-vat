import React from 'react'
import { CustomerSalesOrderImport } from './Import'
const { SalesOrderRoutePlanningForm, lang } = CustomerSalesOrderImport

export default function SalesOrderRoutePlanning() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.so_route_planning}</h6>
                        </div>
                    </div>
                </div>
            </div>

            <SalesOrderRoutePlanningForm />
        </>
    )
}
