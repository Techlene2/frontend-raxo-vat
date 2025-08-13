import React from 'react'
import { BusinessAreaWareHouseImport } from './Imports'
const { UpdateBusinessAreaWareHouseForm, lang } = BusinessAreaWareHouseImport

export default function UpdateBusinessAreaWareHouse() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.update + ' ' + lang.ware_house}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <UpdateBusinessAreaWareHouseForm />
                </div>
            </div>
        </div>
    )
}
