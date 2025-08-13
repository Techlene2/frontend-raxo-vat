import React from 'react'
import { CompanyBusinessAreaImport } from './Import'
const { AddCompanyBusinessAreaForm, lang } = CompanyBusinessAreaImport

export default function AddCompanyBusinessArea() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.add + ' ' + lang.bussiness_area}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <AddCompanyBusinessAreaForm />
                    </div>
                </div>
            </div>
        </>
    )
}
