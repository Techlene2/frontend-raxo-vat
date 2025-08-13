import React, { useState } from 'react'
import { LoginImport } from './Imports'
const { LoginBanner, Logo, UserLoginForm, ForgetPasswordForm, AOS, ToastContainer } = LoginImport

export default function UserLogin() {

    AOS.init();
    const [toggle, setTogggle] = useState(false)

    return (
        <>
            <div className="video-container">
                <video autoPlay muted loop id="video" width='100%' className='body-overlay d-lg-block'>
                    <source src='./login_bg_vd.mp4' type="video/mp4" />
                </video>
                {/* <div className='login_bg' > */}
                <div className="container-fluid" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="container">
                        <div className="row justify-content-center h-100">
                            <div className="col-12 col-lg-7 my-auto order-2 order-md-1">
                                <div className='login_bg_height'>
                                    {/* <img src={LoginBanner} alt="login" className='img-fluid login_bg_max' /> */}
                                </div>
                            </div>

                            {!toggle ?
                                <div className="col-12 col-lg-5 my-auto order-1 order-md-2" data-aos="flip-left" data-aos-duration="1000">
                                    <div className='login_details'>
                                        <div className='login_logo'>
                                            <img src={Logo} className='img-fluid' alt="logo" />
                                        </div>
                                        <div className='login_details1 mt-2'>
                                            <h3>Sign In to Continue</h3>
                                            <p>Let's get started !!...</p>
                                        </div>

                                        <UserLoginForm setTogggle={setTogggle} />
                                    </div>
                                </div>
                                : ''
                            }

                            {toggle ?
                                <div className="col-12 col-lg-5 my-auto order-1 order-md-2" data-aos="flip-right" data-aos-duration="1000">
                                    <div className='login_details'>
                                        <div className='login_logo'>
                                            <img src={Logo} className='img-fluid' alt="logo" />
                                        </div>
                                        <div className='login_details1 mt-2'>
                                            <h3>Forget Password</h3>
                                            <p>Let's get started !!...</p>
                                        </div>

                                        <ForgetPasswordForm setTogggle={setTogggle} />
                                    </div>
                                </div>
                                : ''
                            }
                        </div>
                    </div>
                </div>
                {/* </div> */}
            </div>
            <ToastContainer />
        </>
    )
}
