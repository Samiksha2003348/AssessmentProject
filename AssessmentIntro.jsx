import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { routes } from './ContextPage/RoutingPage'
import Context from './AssessmentPages/Context'



const AssessmentIntro = () => {
  return (
    <div>
        <Context>
             <RouterProvider router={routes}></RouterProvider>
        </Context>
       
        
        
    </div>
  )
}

export default AssessmentIntro
