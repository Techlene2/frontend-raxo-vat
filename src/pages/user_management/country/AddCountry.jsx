import React from 'react'
import { CountryImport } from './Imports'
const { AddCountryForm, lang } = CountryImport

export default function AddCountry() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.country}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddCountryForm />
                </div>
            </div>
        </div>
    )
}
