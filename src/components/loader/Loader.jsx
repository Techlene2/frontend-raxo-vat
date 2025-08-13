import React from 'react'
import { PropagateLoader } from 'react-spinners'

export default function Loader() {
    return (
        <>
            <div className="text-center mb-3">
                <PropagateLoader
                    color="#21263c"
                    size={20}
                />
            </div>
        </>
    )
}
