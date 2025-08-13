import React from 'react'
import { MeasureUnitTypeImport } from './Imports'
const { AddMeasureUnitTypeForm ,lang} = MeasureUnitTypeImport

export default function AddMeasureUnitType() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className='layout d-flex justify-content-between align-items-end'>
            <h6>{lang.add + ' ' + lang.measurement_unit_type}</h6>
          </div>
        </div>

        <div className="col-md-12">
          <AddMeasureUnitTypeForm />
        </div>
      </div>
    </div>
  )
}
