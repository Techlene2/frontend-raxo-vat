import React from 'react'
import { TaxImport } from './Imports'
const { AddTaxForm, lang } = TaxImport

export default function AddTax() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.tax}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddTaxForm />
                </div>
            </div>
        </div>
    )
}
