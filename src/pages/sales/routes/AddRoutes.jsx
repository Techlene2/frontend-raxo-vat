import React from 'react'
import { RoutesImport } from './Imports'
const { AddRoutesForm, lang } = RoutesImport

export default function AddRoutes() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.routes}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddRoutesForm />
                </div>
            </div>
        </div>
    )
}
