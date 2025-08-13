import React from 'react'
import { BusinessAreaWareHouseImport } from './Imports'
const { AddBusinessAreaWareHouseForm, lang } = BusinessAreaWareHouseImport

export default function AddBusinessAreaWareHouse() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">

                    <div className='layout d-flex justify-content-between align-items-end'>
                        <h6>{lang.add + ' ' + lang.ware_house}</h6>
                    </div>
                </div>

                <div className="col-md-12">
                    <AddBusinessAreaWareHouseForm />
                </div>
            </div>
        </div>
    )
}
