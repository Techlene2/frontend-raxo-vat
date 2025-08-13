import React from 'react'
import { CostCenterImport } from './Imports'
const { AddCostCenterForm, lang } = CostCenterImport

export default function AddCostCenter() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.cost_center}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddCostCenterForm />
                </div>
            </div>
        </div>
    )
}
