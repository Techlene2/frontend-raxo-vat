import React from 'react'
import { EmployeeImport } from './Imports'
const { UpdateEmployeeForm, lang } = EmployeeImport

export default function UpdateEmployee() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.employee}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateEmployeeForm />
                </div>
            </div>
        </div>
    )
}
