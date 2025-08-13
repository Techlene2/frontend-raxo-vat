import React from 'react'
import { VendorImport } from './Imports'
const { UpdateVendorForm, lang } = VendorImport

export default function UpdateVendor() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.vendor}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateVendorForm />
                </div>
            </div>
        </div>
    )
}
