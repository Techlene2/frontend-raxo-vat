import React from 'react'
import { GradeImport } from './Import.js'
const { UpdateGradeForm, lang } = GradeImport

export default function UpdateGrade() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.update + ' ' + lang.grade}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <UpdateGradeForm />
                    </div>
                </div>
            </div>
        </>
    )
}
