import React from 'react'
import { BrandImport } from './Imports.js'
const { UpdateBrandForm, lang } = BrandImport

export default function UpdateBrand() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.brand}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateBrandForm />
                </div>
            </div>
        </div>
    )
}
