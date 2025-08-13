import React from 'react'
import { CostCenterImport } from './Imports'
const { UpdateCostCenterForm, lang } = CostCenterImport

export default function UpdateCostCenter() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.cost_center}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateCostCenterForm />
                </div>
            </div>
        </div>
    )
}
