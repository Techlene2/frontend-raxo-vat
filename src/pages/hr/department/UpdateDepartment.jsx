import React from 'react'
import { DepartmentImport } from './Imports'
const { UpdateDepartmentForm, lang } = DepartmentImport

export default function UpdateDepartment() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.department}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateDepartmentForm />
                </div>
            </div>
        </div>
    )
}
