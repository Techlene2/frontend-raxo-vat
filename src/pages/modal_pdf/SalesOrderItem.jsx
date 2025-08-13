import React from 'react'
import { ModalPDFImport } from './Import'
const { Button, Table, Modal, moment, useSelector, Loader, useReactToPrint, LuPrinter } = ModalPDFImport

export default function SalesOrderItem(props) {

    const { soModal, setSOModal, soModalLoading } = props

    const so_details = useSelector(state => state && state.salesOrderDetails && state.salesOrderDetails.data)
    const address = so_details && JSON.parse(so_details.despatchAddress)
    // console.log(so_details)

    const handleClose = () => setSOModal(false)

    const totalCharges = so_details && so_details.customerSalesOrderItems && so_details.customerSalesOrderItems.reduce((acc, val) => {
        const rate = parseFloat(val.price) || 0;
        const quantity = parseFloat(val.quantity) || 0;
        const discount = parseFloat(val.discountPer) || 0;
        const vat = parseFloat(val.taxRate) || 0;

        const grand_itemTotal = (rate * quantity) + ((vat * rate * quantity) / 100) - (discount * (rate * quantity) / 100);
        const grand_subTotal = rate * quantity;
        const grand_discount = (discount * (rate * quantity) / 100);
        const grand_vat = (vat * (rate * quantity) / 100);

        return {
            "grand_total": acc.grand_total + grand_itemTotal,
            "sub_total": acc.sub_total + grand_subTotal,
            "discount_total": acc.discount_total + grand_discount,
            "vat_total": acc.vat_total + grand_vat,
        }
    }, {
        grand_total: 0,
        sub_total: 0,
        discount_total: 0,
        vat_total: 0,
    })

    const handlePrint = useReactToPrint({
        content: () => document.getElementById('content-to-print'),
    });

    return (
        <>
            <Modal
                show={soModal}
                backdrop="static"
                onHide={handleClose}
                centered
                size='xl'
            >
                <Modal.Header closeButton style={{ padding: '5px' }}>
                    <Button variant='primary' size='sm' onClick={handlePrint}>
                        Print <LuPrinter />
                    </Button>
                </Modal.Header>
                <Modal.Body>
                    {soModalLoading ?
                        <Loader />
                        :
                        so_details &&
                        <div className="container" id="content-to-print">
                            <div className="row">
                                <div className="col-md-6">
                                    <span className='fs-3 fw-medium'>SALES ORDER</span> <br />
                                    <span>Sales Order#</span>
                                    <span className='fw-medium'> {so_details && so_details.code}</span> <br />

                                    <div className='d-flex align-items-center mt-3' style={{ fontWeight: '600' }}>
                                        <span style={{ color: '#555555' }}>Order Date:</span>
                                        <span className='ms-1'>{moment(so_details && so_details.custPoDate).format('DD-MM-YYYY')}</span>
                                    </div>

                                    <div className='d-flex align-items-center' style={{ fontWeight: '600' }}>
                                        <span style={{ color: '#555555' }}>Delivery Date:</span>
                                        <span className='ms-1'>{moment(so_details && so_details.deliveryDate).format('DD-MM-YYYY')}</span>
                                    </div>

                                    <div className='d-flex align-items-center' style={{ fontWeight: '600' }}>
                                        <span style={{ color: '#555555' }}>Sales Person:</span>
                                        <span className='ms-1'>{`${so_details && so_details.user && so_details.user.firstName} ${so_details && so_details.user && so_details.user.lastName}`}</span>
                                    </div>

                                </div>

                                <div className="col-md-6">
                                    <strong style={{ color: '#555555' }}>Dispatch Address</strong>
                                    <h6 className='text-primary'>{address && address.personName}</h6>
                                    <span>{address && address.address}</span><br />
                                    <span>{`${address && address.cityDetail && address.cityDetail.name}, ${address && address.cityDetail && address.cityDetail.state && address.cityDetail.state.name}, ${address && address.cityDetail && address.cityDetail.state && address.cityDetail.state.country && address.cityDetail.state.country.name}`}</span><br />
                                    <span>{address && address.phone}</span><br />
                                    <span>{address && address.email}</span><br />
                                    <span>{address && address.dispatchGSTNo}</span><br />
                                </div>

                                <div className="col-md-12">
                                    <Table responsive className='mt-2' style={{ fontSize: '13px' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ background: 'rgba(0,0,0,0.05)' }}>Item</th>
                                                <th style={{ background: 'rgba(0,0,0,0.05)' }}>Rate</th>
                                                <th style={{ background: 'rgba(0,0,0,0.05)' }}>Quantity</th>
                                                <th style={{ background: 'rgba(0,0,0,0.05)' }}>Unit</th>
                                                <th style={{ background: 'rgba(0,0,0,0.05)' }}>Sub Total</th>
                                                <th style={{ background: 'rgba(0,0,0,0.05)' }}>Discount</th>
                                                <th style={{ background: 'rgba(0,0,0,0.05)' }}>VAT</th>
                                                <th style={{ background: 'rgba(0,0,0,0.05)' }}>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {so_details && so_details.customerSalesOrderItems && so_details.customerSalesOrderItems.map((val, index) =>
                                                <tr key={index}>
                                                    <td>{`${val && val.itemMaster && val.itemMaster.name} (${val && val.itemMaster && val.itemMaster.code})`}</td>
                                                    <td>{val && val.price}</td>
                                                    <td>{val && val.quantity}</td>
                                                    <td>{val && val.itemMaster && val.itemMaster.measurementUnit && val.itemMaster.measurementUnit.name}</td>
                                                    <td>{(val && val.price) * (val && val.quantity)}</td>
                                                    <td>{`${(((val && val.discountPer) * (val && val.price) * (val && val.quantity)) / 100)} (${val && val.discountPer})`}</td>
                                                    <td>{`${(((val && val.taxRate) * (val && val.price) * (val && val.quantity)) / 100)} (${val && val.taxRate})`}</td>
                                                    <td>
                                                        {
                                                            (
                                                                ((val && val.price) * (val && val.quantity))
                                                                +
                                                                (((val && val.taxRate) * (val && val.price) * (val && val.quantity)) / 100)
                                                            )
                                                            -
                                                            (
                                                                ((val && val.discountPer) * (val && val.price) * (val && val.quantity)) / 100
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                        <tfoot>
                                            <tr className='fw-bold' style={{ fontSize: '15px' }}>
                                                <td colSpan={4} style={{ background: 'rgba(0,0,0,0.05)' }}>
                                                </td>
                                                <td style={{ background: 'rgba(0,0,0,0.05)' }}>
                                                    {totalCharges && totalCharges.sub_total}
                                                </td>
                                                <td style={{ background: 'rgba(0,0,0,0.05)' }}>
                                                    {totalCharges && totalCharges.discount_total}
                                                </td>
                                                <td style={{ background: 'rgba(0,0,0,0.05)' }}>
                                                    {totalCharges && totalCharges.vat_total}
                                                </td>
                                                <td colSpan={2} style={{ background: 'rgba(0,0,0,0.05)' }}>
                                                    <span>
                                                        {totalCharges && totalCharges.grand_total}
                                                    </span>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    }
                </Modal.Body>
            </Modal>
        </>
    )
}
