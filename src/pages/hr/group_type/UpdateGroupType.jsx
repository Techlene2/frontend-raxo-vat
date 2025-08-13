import React from 'react'
import { GroupTypeImport } from './Imports'
const { UpdateGroupTypeForm, lang } = GroupTypeImport

export default function UpdateGroupType() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>  {lang.update + ' ' + lang.group_type}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <UpdateGroupTypeForm />
                    </div>
                </div>
            </div>
        </>
    )
}
