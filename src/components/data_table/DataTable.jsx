import React, { useCallback, useMemo, useRef } from 'react'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import '../../assets/styles/data_table/DataTable.css'

export default function DataTable(props) {

    const gridRef = useRef()

    const defaultColDef = useMemo(() => ({
        flex: 1,
        resizable: true,
        suppressMenu: true,
        // width: 200
        cellStyle: {
            fontSize: '12px',
            fontFamily: 'Inter'
        }
    }), [])

    // const calculateTotal = () => {
    //     if (props.rowData && props.rowData.length > 0) {
    //         const total = props.rowData.reduce((acc, row) => acc + parseInt(row.price), 0);
    //         return { make: 'Total', model: '', price: total.toString() };
    //     }
    //     return {};
    // };

    // const pinnedBottomRowData = useMemo(() => {
    //     const totalRow = calculateTotal();
    //     return totalRow ? [totalRow] : [];
    // }, [props.rowData]);

    const onBtShowLoading = useCallback(() => {
        gridRef && gridRef.current && gridRef.current.api.showLoadingOverlay();
    }, []);

    const onBtHide = useCallback(() => {
        gridRef && gridRef.current && gridRef.current.api.hideOverlay();
    }, []);

    if (props.loading) {
        onBtShowLoading()
    } else if (!props.loading) {
        onBtHide()
    }

    return (
        <>
            <div className="ag-theme-alpine" style={{ height: props && props.height ? props.height : '65vh', width: '100%' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={props.rowData}
                    columnDefs={props.columnDefs}
                    defaultColDef={defaultColDef}
                    headerHeight={35}
                    rowHeight={35}
                    enableRtl={localStorage.getItem('lang_key') == 'ar' ? true : false}
                    // pinnedBottomRowData={pinnedBottomRowData}
                    overlayLoadingTemplate={
                        '<div aria-live="polite" aria-atomic="true" style="height:100px; width:100px; background: url(https://ag-grid.com/images/ag-grid-loading-spinner.svg) center / contain no-repeat; margin: 0 auto;" aria-label="loading"></div>'
                    }
                />
            </div >
        </>
    )
}
