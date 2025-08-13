import React from 'react'
import { GroupImport } from './Imports'
const { AddGroupForm, lang } = GroupImport

export default function AddGroup() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.group}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddGroupForm />
                </div>
            </div>
        </div>
    )
}
