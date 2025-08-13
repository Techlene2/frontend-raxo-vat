import React from 'react'
import { DepartmentImport } from './Imports'
const { AddDepartmentForm, lang } = DepartmentImport

export default function AddDepartment() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.department}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddDepartmentForm />
                </div>
            </div>
        </div>
    )
}
