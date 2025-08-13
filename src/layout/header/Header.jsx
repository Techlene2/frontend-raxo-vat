import React from 'react'
import { HeaderImport } from './Imports'
const { LuAlignJustify, LuKeyRound, LuPower, LuUserCircle, LuUserCog, useNavigate, Dropdown, FavIcon, Form } = HeaderImport

export default function Header(props) {

    const { collapsed, setCollapsed } = props
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('user_token')
        localStorage.removeItem('permission')
        localStorage.removeItem('user')
        // localStorage.clear()
        navigate('/login')
    }

    return (
        <>
            {/* <nav className={collapsed ? "navbar navbar_body_collapsed fixed-top" : "navbar navbar_body_notcollapsed fixed-top"} > */}
            <nav className="navbar navbar_body fixed-top" >
                <div className="container-fluid">
                    <div className="navbar-brand navbar-logo">
                        <img src={FavIcon} className='img-fluid login_bg_max' alt="logo" />
                    </div>
                    {/* <span className="navbar-brand" onClick={() => setCollapsed(!collapsed)} style={{ cursor: 'pointer' }}>
                        <LuAlignJustify style={{ color: 'white' }} /> 
                    </span> */}

                    <div className='d-flex align-items-center'>
                        <Form.Select
                            size="sm"
                            className='form_select'
                            defaultValue={localStorage.getItem('lang_key')}
                            onChange={(e) => { localStorage.setItem('lang_key', e.target.value); window.location.reload() }}
                        >
                            <option value='en'>English</option>
                            <option value='ar'>Arabic</option>
                        </Form.Select>

                        <Dropdown>
                            <Dropdown.Toggle
                                variant=""
                                size='sm'
                                className='btn ms-1'
                                style={{ color: 'white' }}
                            >
                                <LuUserCog size={16} className='mb-1 me-1' /> Viplove! (Admin)
                            </Dropdown.Toggle>

                            <Dropdown.Menu style={{ fontSize: '13px' }}>
                                <Dropdown.Item href=""><LuUserCircle size={16} className='mb-1 me-1' /> Profile</Dropdown.Item>
                                <Dropdown.Item href=""><LuKeyRound size={16} className='mb-1 me-1' /> Change Password</Dropdown.Item>
                                <hr className='hr_line' />
                                <Dropdown.Item href="" onClick={() => logout()}><LuPower size={16} className='me-1' /> Log Out</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </nav>
        </>
    )
}
