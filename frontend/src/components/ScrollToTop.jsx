import useSelection from 'antd/es/table/hooks/useSelection'
import React, { useEffect } from 'react'

const ScrollToTop = () => {
  
    useEffect(() => {
        window.scrollTo({
            top:0,
            behavior:"auto"
        })
      

    }, [])
    
}

export default ScrollToTop