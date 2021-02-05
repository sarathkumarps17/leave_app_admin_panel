import React from 'react'
import { useHistory } from "react-router-dom";
import { CButton } from "@coreui/react"
import CIcon from "@coreui/icons-react";
import { freeSet } from '@coreui/icons';

function BackButton() {
    let history = useHistory();
    return (
        <>
            <CButton size="sm" variant='ghost'
                className="back_button" color="primary" onClick={() => history.goBack()}>
                <CIcon content={freeSet.cilChevronLeft} />
            </CButton>
        </>
    );
}

export default BackButton