import React from 'react'
import { EmployeeImport } from './Imports'
const { AddEmployeeForm, lang } = EmployeeImport

export default function AddEmployee() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.employee}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddEmployeeForm />
                </div>
            </div>
        </div>
    )
}
