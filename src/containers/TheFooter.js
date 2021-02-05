import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <span className="ml-1">&copy; 2020 Vacationme.com.</span>
      </div>
      <div className="mfs-auto">
        {/* <span className="mr-1">Powered by</span> */}
        {/* <a href="https://www.claiga.com/" target="_blank" rel="noopener noreferrer">Claiga</a> */}
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
