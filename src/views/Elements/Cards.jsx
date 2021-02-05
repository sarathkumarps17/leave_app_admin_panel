import React from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CCollapse,
    CLink,
    CBadge
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Cards = ({ heading, content, color, badge }) => {
    const [collapsed, setCollapsed] = React.useState(true)
    //   const [showCard, setShowCard] = React.useState(true)

    return (
        <>
            <CRow className="justify-content-center">
                <CCol>
                    <CCard>
                        <CCardHeader>
                            {heading}
                            <div className="card-header-actions">

                                <CBadge color={color}>{badge}</CBadge>
                                <CLink className="card-header-action" onClick={() => setCollapsed(!collapsed)}>
                                    <CIcon name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
                                </CLink>
                            </div>
                        </CCardHeader>
                        <CCollapse show={collapsed}>
                            <CCardBody>
                                {content}
                            </CCardBody>
                        </CCollapse>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}

export default Cards
