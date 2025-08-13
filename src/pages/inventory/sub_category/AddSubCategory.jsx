import React from 'react'
import { SubCategoryImport } from './Imports'
const { AddSubCategoryForm, lang } = SubCategoryImport

export default function AddSubCategory() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.sub_category}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddSubCategoryForm />
                </div>
            </div>
        </div>
    )
}
