import React from 'react'
import { MainMenuImport } from './Imports'
const { AddMainMenuForm, lang } = MainMenuImport

export default function AddMainMenu() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>{lang.add + ' ' + lang.main_menu}</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <AddMainMenuForm />
                    </div>
                </div>
            </div>
        </>
    )
}
