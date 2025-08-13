import React from 'react'
import { PermissionMenuImport } from './Imports'
const { UpdatePermissionMenuForm, lang } = PermissionMenuImport

export default function UpdatePermissionMenu() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.update + ' ' + lang.permisiion_menu}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <UpdatePermissionMenuForm />
                    </div>
                </div>
            </div>
        </>
    )
}
