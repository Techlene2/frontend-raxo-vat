import React from 'react'
import { DispatchPlanningImport } from './Import'
const { AddDispatchPlanningForm, lang } = DispatchPlanningImport

export default function AddDispatchPlanning() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.add + ' ' + lang.dispatch_planning}</h6>
                        </div>
                    </div>

                </div>
            </div>

            <AddDispatchPlanningForm />
        </>
    )
}
