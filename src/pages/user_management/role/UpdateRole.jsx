import React from 'react'
import { RoleImport } from './Imports'
const { UpdateRoleForm, lang } = RoleImport

export default function UpdateRole() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>  {lang.update + ' ' + lang.role}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateRoleForm />
                </div>
            </div>
        </div>
    )
}
