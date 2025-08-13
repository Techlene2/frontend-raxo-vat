import React from 'react'
import { UserImport } from './Imports'
const { AddUserForm } = UserImport

export default function AddUser() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h6>Add User</h6>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <AddUserForm />
                    </div>
                </div>
            </div>
        </>
    )
}
