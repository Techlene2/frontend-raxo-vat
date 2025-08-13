import React from 'react'
import { CurrencyImport } from './Imports.js'
const { AddCurrencyForm, lang } = CurrencyImport

export default function AddCurrency() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                    <h6>{lang.add + ' ' + lang.currency}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddCurrencyForm />
                </div>
            </div>
        </div>
    )
}
