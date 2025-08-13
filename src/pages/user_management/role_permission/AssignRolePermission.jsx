import React from 'react'
import { RolePermissionImport } from './Imports'
const { AssignRolePermissionForm, lang } = RolePermissionImport

export default function AssignRolePermission() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.assingn_permission}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AssignRolePermissionForm />
                </div>
            </div>
        </div>
    )
}
