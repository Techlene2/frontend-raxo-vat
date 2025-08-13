import React from 'react'
import { CompanyImport } from './Imports'
const { AddCompanyForm, lang } = CompanyImport

export default function AddCompany() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className='layout d-flex justify-content-between align-items-end'>
              <h6>{lang.add + ' ' + lang.company}</h6>
            </div>
          </div>

          <div className="col-md-12">
            <AddCompanyForm />
          </div>
        </div>
      </div>
    </>
  )
}
