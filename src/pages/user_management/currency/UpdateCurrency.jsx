import React from 'react'
import { CurrencyImport } from './Imports.js'
const { UpdateCurrencyForm, lang } = CurrencyImport

export default function UpdateCurrency() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.currency}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateCurrencyForm />
                </div>
            </div>
        </div>
    )
}
