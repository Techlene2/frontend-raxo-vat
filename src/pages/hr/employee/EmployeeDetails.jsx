import React from 'react'
import { EmployeeImport } from './Imports'
const { Modal, Tabs, Tab, Badge, useSelector, Loader, NA, lang } = EmployeeImport

export default function EmployeeDetails(props) {

    const { details, setDetails, detailsLoading, setDetailsLoading } = props

    const employee_details = useSelector(state => state.employeeDetails && state.employeeDetails.data)
    const handleClose = () => setDetails(false)

    return (
        <>
            <Modal show={details} onHide={handleClose} backdrop="static" size='lg' centered>
                <Modal.Header closeButton className='p-2'>
                    <Modal.Title className='fw-bold' style={{ fontSize: '16px' }}>{detailsLoading ? 'Loading...' : employee_details?.firstName + ' ' + employee_details?.lastName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {detailsLoading ?
                        <Loader />
                        :
                        employee_details ?
                            <div className="row">
                                <div className="col-md-7">
                                    <Tabs
                                        defaultActiveKey="basic"
                                        transition={false}
                                        id="noanim-tab-example"
                                        className="mb-3"
                                        style={{ fontSize: '13px' }}
                                    >
                                        <Tab eventKey="basic" title={lang.basic}>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.user_type}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.userType}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.dob}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.dateOfBirth ? new Date(employee_details.dateOfBirth).toDateString() : ''}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.gender}</span>
                                                <span className='form_label text-capitalize' style={{ color: '#000000' }}>{employee_details?.gender}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.email}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.email}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.father_name}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.fatherName}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.mother_name}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.motherName}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.mobile_no}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.mobileNo}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.status}</span>
                                                <span className='form_label'>{employee_details?.isActive ? <Badge bg="success">Active</Badge> : <Badge bg="danger">Inactive</Badge>}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.isUser}</span><br />
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.user ? "YES" : "NO"}</span>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="address" title={lang.address}>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.city}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.city?.name}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.postal_code}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.postalCode}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.phone_no}</span>
                                                <span className='form_label text-capitalize' style={{ color: '#000000' }}>{employee_details?.phoneNo}</span>
                                            </div>
                                            <div className=''>
                                                <span className='form_label'>{lang.address}</span><br />
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.address}</span>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="driver" title={lang.driver}>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.license_no}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.licenseNumber}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.license_expiry}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.liceneceExpiryDate ? new Date(employee_details.liceneceExpiryDate).toDateString() : ''}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.passport_no}</span>
                                                <span className='form_label text-capitalize' style={{ color: '#000000' }}>{employee_details?.passportNo}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.passport_expiry}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.passportExpiryDate ? new Date(employee_details.passportExpiryDate).toDateString() : ''}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.visa_no}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.visaNumber}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.visa_issue}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{employee_details?.visaIssueDate ? new Date(employee_details.visaIssueDate).toDateString() : ''}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.visa_expiry}</span>
                                                <span className='form_label text-capitalize' style={{ color: '#000000' }}>{employee_details?.visaExpiryDate ? new Date(employee_details.visaExpiryDate).toDateString() : ''}</span>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>

                                <div className="col-md-5">
                                    <div className='text-center'>
                                        <img src={employee_details.imageUrl ? employee_details.imageUrl : ''} alt="" className='img-fluid rounded-circle' onError={(e) => e.target.src = NA} />
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="text-center text-danger fw-bold">
                                Item details not found
                            </div>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}
