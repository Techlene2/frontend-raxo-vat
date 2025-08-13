import React from 'react'
import { RegionImport } from './Import.js'
const { AddRegionForm, lang } = RegionImport

export default function AddRegion() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.add + ' ' + lang.region}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <AddRegionForm />
                    </div>
                </div>
            </div>
        </>
    )
}
