import React from 'react'
import { TaxImport } from './Imports'
const { UpdateTaxForm, lang } = TaxImport

export default function UpdateTax() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.tax}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateTaxForm />
                </div>
            </div>
        </div>
    )
}
