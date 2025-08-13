import React from 'react'
import { CustomerGroupImport } from './Import.js'
const { UpdateCustomerGroupForm, lang } = CustomerGroupImport

export default function UpdateCustomerGroup() {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">

            <div className='layout d-flex justify-content-between align-items-end'>
              <h6>{lang.update + ' ' + lang.customer_group}</h6>
            </div>
          </div>

          <div className="col-md-12">
            <UpdateCustomerGroupForm />
          </div>
        </div>
      </div>
    </>
  )
}
