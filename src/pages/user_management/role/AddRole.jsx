import React from 'react'
import { RoleImport } from './Imports'
const { AddRoleForm, lang } = RoleImport

export default function AddRole() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.role}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddRoleForm />
                </div>
            </div>
        </div>
    )
}
