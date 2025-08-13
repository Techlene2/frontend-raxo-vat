import React from 'react'
import { ItemImport } from './Imports'
const { AddItemForm, lang } = ItemImport

export default function AddItem() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.add + ' ' + lang.item}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <AddItemForm />
                    </div>
                </div>
            </div>
        </>
    )
}
