import React from 'react'
import { VendorImport } from './Imports'
const { AddVendorForm, lang } = VendorImport

export default function AddVendor() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.vendor}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddVendorForm />
                </div>
            </div>
        </div>
    )
}
