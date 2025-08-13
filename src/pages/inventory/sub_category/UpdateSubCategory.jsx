import React from 'react'
import { SubCategoryImport } from './Imports'
const { UpdateSubCategoryForm, lang } = SubCategoryImport

export default function UpdateSubCategory() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.sub_category}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateSubCategoryForm />
                </div>
            </div>
        </div>
    )
}
