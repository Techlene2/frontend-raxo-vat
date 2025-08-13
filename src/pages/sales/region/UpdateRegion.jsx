import React from 'react'
import { RegionImport } from './Import.js'
const { UpdateRegionForm, lang } = RegionImport

export default function UpdateRegion() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.update + ' ' + lang.region}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <UpdateRegionForm />
                    </div>
                </div>
            </div>
        </>
    )
}
