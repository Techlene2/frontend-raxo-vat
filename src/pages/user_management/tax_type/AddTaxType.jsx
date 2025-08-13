import React from 'react'
import { TaxTypeImport } from './Imports'
const { AddTaxTypeForm, lang } = TaxTypeImport

export default function AddTaxType() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.tax_type}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddTaxTypeForm />
                </div>
            </div>
        </div>
    )
}
