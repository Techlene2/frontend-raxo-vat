import React from 'react'
import { CountryImport } from './Imports'
const { UpdateCountryForm, lang } = CountryImport

export default function UpdateCountry() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.country}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateCountryForm />
                </div>
            </div>
        </div>
    )
}
