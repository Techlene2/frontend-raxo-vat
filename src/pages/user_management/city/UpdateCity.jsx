import React from 'react'
import { CityImport } from './Imports'
const { UpdateCityForm, lang } = CityImport

export default function UpdateCity() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.city}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateCityForm />
                </div>
            </div>
        </div>
    )
}
