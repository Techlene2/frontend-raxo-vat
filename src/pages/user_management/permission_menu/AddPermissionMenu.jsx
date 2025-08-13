import React from 'react'
import { PermissionMenuImport } from './Imports'
const { AddPermissionMenuForm, lang } = PermissionMenuImport

export default function AddPermissionMenu() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.add + ' ' + lang.permisiion_menu}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <AddPermissionMenuForm />
                    </div>
                </div>
            </div>
        </>
    )
}
