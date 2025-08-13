import React from 'react'
import { CategoryImport } from './Imports'
const { AddCategoryForm, lang } = CategoryImport

export default function AddCategory() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.category}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddCategoryForm />
                </div>
            </div>
        </div>
    )
}
