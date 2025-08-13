import React from 'react'
import { StateImport } from './Imports'
const { UpdateStateForm, lang } = StateImport

export default function UpdateState() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.state}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateStateForm />
                </div>
            </div>
        </div>
    )
}
