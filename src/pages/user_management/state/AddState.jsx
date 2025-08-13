import React from 'react'
import { StateImport } from './Imports'
const { AddStateForm, lang } = StateImport

export default function AddState() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.state}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddStateForm />
                </div>
            </div>
        </div>
    )
}
