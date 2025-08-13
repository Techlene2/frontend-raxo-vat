import React from 'react'
import { CategoryImport } from './Imports'
const { UpdateCategoryForm, lang } = CategoryImport

export default function UpdateCategory() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.category}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateCategoryForm />
                </div>
            </div>
        </div>
    )
}
