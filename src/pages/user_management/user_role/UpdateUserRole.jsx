import React from 'react'
import { UserRoleImport } from './Imports'
const { UpdateUserRoleForm, lang } = UserRoleImport

export default function UpdateUserRole() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.update + ' ' + lang.user_role}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <UpdateUserRoleForm />
                    </div>
                </div>
            </div>
        </>
    )
}
