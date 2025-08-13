import React from 'react'
import { MainMenuImport } from './Imports'
const { UpdateMainMenuForm, lang } = MainMenuImport

export default function UpdateMainMenu() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.main_menu}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateMainMenuForm />
                </div>
            </div>
        </div>
    )
}
