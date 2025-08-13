import React from 'react'
import { CompanyImport } from './Imports'
const { UpdateCompanyForm, lang } = CompanyImport

export default function UpdateCompany() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.update + ' ' + lang.company}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <UpdateCompanyForm />
                    </div>
                </div>
            </div>
        </>
    )
}
