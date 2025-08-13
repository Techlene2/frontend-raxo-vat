import React from 'react'
import { CityImport } from './Imports'
const { AddCityForm, lang } = CityImport

export default function AddCity() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.city}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddCityForm />
                </div>
            </div>
        </div>
    )
}
