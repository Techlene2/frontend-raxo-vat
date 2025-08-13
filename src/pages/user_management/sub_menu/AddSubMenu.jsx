import React from 'react'
import { SubMenuImport } from './Imports'
const { AddSubMenuForm, lang } = SubMenuImport

export default function AddSubMenu() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.add + ' ' + lang.sub_menu}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <AddSubMenuForm />
                    </div>
                </div>
            </div>
        </>
    )
}
