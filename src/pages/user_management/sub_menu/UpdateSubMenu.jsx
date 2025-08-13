import React from 'react'
import { SubMenuImport } from './Imports'
const { UpdateSubMenuForm, lang  } = SubMenuImport

export default function UpdateSubMenu() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.sub_menu}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateSubMenuForm />
                </div>
            </div>
        </div>
    )
}
