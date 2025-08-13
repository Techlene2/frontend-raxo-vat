import React from 'react'
import { DispatchPlanningImport } from './Import'
const { UpdateDispatchPlanningForm, lang } = DispatchPlanningImport

export default function UpdateDispatchPlanning() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.update + ' ' + lang.dispatch_planning}</h6>
                        </div>

                    </div>
                </div>
            </div>
            
            <UpdateDispatchPlanningForm />
        </>
    )
}
