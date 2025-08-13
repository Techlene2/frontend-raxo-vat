import React from 'react'
import { DriverImport } from './Imports'
const { AddDriverForm, lang } = DriverImport

export default function AddDriver() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.driver}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddDriverForm />
                </div>
            </div>
        </div>
    )
}
