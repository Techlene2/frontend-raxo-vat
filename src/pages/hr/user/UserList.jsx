import React from 'react'
import { UserImport } from './Imports'
const { Link, LoginBanner, AddButton } = UserImport

export default function UserList() {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">

                        <div className='layout d-flex justify-content-between align-items-end'>
                            <h5>User</h5>
                            <Link to='/add-user'>
                                <AddButton button_name='Add User' />
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="layout">

                            <div className='no_content_img'>
                                <img src={LoginBanner} alt="no-content" className='img-fluid' style={{ maxHeight: '100%' }} />
                            </div>

                            <div className='no_content_data'>
                                <h4>Create the User</h4>
                                <p>Start your journey by adding User and much more</p>
                                <Link to='/add-user'><AddButton button_name='Add User' /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
