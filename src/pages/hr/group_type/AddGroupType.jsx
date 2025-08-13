import React from 'react'
import { GroupTypeImport } from './Imports'
const { AddGroupTypeForm, lang } = GroupTypeImport

export default function AddGroupType() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.add + ' ' + lang.group_type}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <AddGroupTypeForm />
                    </div>
                </div>
            </div>
        </>
    )
}
