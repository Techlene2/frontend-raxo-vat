import React from 'react'
import { UserImport } from './Imports'
const { UpdateUserForm } = UserImport

export default function UpdateUser() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>Update User</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <UpdateUserForm />
                    </div>
                </div>
            </div>
        </>
    )
}
