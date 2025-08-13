import React from 'react'
import { ItemImport } from './Imports'
const { Modal, NotFoundImage, Tabs, Tab, Badge, useSelector, Loader, lang } = ItemImport

export default function ItemDetails(props) {

    const { details, setDetails, detailsLoading, setDetailsLoading } = props

    const item_details = useSelector(state => state.itemDetails && state.itemDetails.data)
    const handleClose = () => setDetails(false)

    return (
        <>
            <Modal show={details} onHide={handleClose} backdrop="static" size='lg' centered>
                <Modal.Header closeButton className='p-2'>
                    <Modal.Title className='fw-bold' style={{ fontSize: '16px' }}>{detailsLoading ? 'Loading...' : item_details?.name + ' (' + item_details?.code + ')'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {detailsLoading ?
                        <Loader />
                        :
                        item_details ?
                            <div className="row">
                                <div className="col-md-7">
                                    <Tabs
                                        defaultActiveKey="main"
                                        transition={false}
                                        id="noanim-tab-example"
                                        className="mb-3"
                                        style={{ fontSize: '13px' }}
                                    >
                                        <Tab eventKey="main" title={lang.main_details}>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.category}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.subCategory?.category?.name}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.sub_category}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.subCategory?.name}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.brand}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.brandMaster?.name}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.cost_center}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.costCenterMaster?.name}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.group}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.groupMaster?.name}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.primary_unit}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.measurementUnit?.name}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.barcode}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.barCode}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.status}</span>
                                                <span className='form_label'>{item_details?.isActive ? <Badge bg="success">Active</Badge> : <Badge bg="danger">Inactive</Badge>}</span>
                                            </div>
                                            <div className=''>
                                                <span className='form_label'>{lang.description}</span><br />
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.description}</span>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="other" title={lang.other_details}>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.tax}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.taxMaster?.name}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.secondary_unit}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.secondaryUnit?.name}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.weight}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.unitWeight}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.conversion}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.conversion}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.color}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.color?.colorName}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.segment}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.segmentNo?.segmentName}</span>
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <span className='form_label'>{lang.rack}</span>
                                                <span className='form_label' style={{ color: '#000000' }}>{item_details?.rackAddress?.rackNumber}</span>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </div>

                                <div className="col-md-5">
                                    <div className='text-center'>
                                        <img src={item_details.imageUrl ? item_details.imageUrl : ''} alt="" className='img-fluid' onError={(e) => e.target.src = NotFoundImage} />
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
