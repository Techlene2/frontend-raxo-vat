import React from 'react'
import { MeasureUnitTypeImport } from './Imports'
const { UpdateMeasureUnitTypeForm, lang } = MeasureUnitTypeImport

export default function UpdateMeasureUnitType() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.measurement_unit_type}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateMeasureUnitTypeForm />
                </div>
            </div>
        </div>
    )
}
