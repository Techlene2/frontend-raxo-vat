import React from 'react'
import { MeasureUnitImport } from './Imports'
const { UpdateMeasureUnitForm, lang } = MeasureUnitImport

export default function UpdateMeasureUnit() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.update + ' ' + lang.measurement_unit}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <UpdateMeasureUnitForm />
                    </div>
                </div>
            </div>
        </>
    )
}
