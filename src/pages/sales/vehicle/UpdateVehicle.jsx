import React from 'react'
import { VehicleImport } from './Imports'
const { UpdateVehicleForm, lang } = VehicleImport

export default function UpdateVehicle() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.vehicle}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateVehicleForm />
                </div>
            </div>
        </div>
    )
}
