import React from 'react'
import { CompanyBusinessAreaImport } from './Import'
const { UpdateCompanyBusinessAreaForm, lang } = CompanyBusinessAreaImport

export default function UpdateCompanyBusinessArea() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.update + ' ' + lang.bussiness_area}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <UpdateCompanyBusinessAreaForm />
                    </div>
                </div>
            </div>
        </>
    )
}
