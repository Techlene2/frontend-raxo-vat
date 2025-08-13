import React from 'react'
import { TaxTypeImport } from './Imports'
const { UpdateTaxTypeForm, lang } = TaxTypeImport

export default function UpdateTaxType() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.tax_type}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateTaxTypeForm />
                </div>
            </div>
        </div>
    )
}
