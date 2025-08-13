import React from 'react'
import { RoutesImport } from './Imports'
const { UpdateRoutesForm, lang } = RoutesImport

export default function UpdateRoutes() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.routes}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateRoutesForm />
                </div>
            </div>
        </div>
    )
}
