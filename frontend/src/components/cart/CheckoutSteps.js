import { Step, StepLabel, Stepper, Typography } from '@mui/material'
import React from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import "./Shippping.css"
const CheckoutSteps = ({activeSteps}) => {

    const steps=[{
        label:<Typography>Shipping Details</Typography>,
        icon:<LocalShippingIcon/>
    },
    {
        label:<Typography>Confirm Order</Typography>,
        icon:<LibraryAddCheckIcon/>
    },
    {
        label:<Typography>Payment</Typography>,
        icon:<AccountBalanceIcon/>
    },
    
]
const stepStyles={
    boxSizing:"border-box"
}
  return (
    <>
    <Stepper alternativeLabel activeStep={activeSteps} style={stepStyles}>
{
    steps.map((step,i)=>(
        <Step key={i} active={activeSteps>=i?true:false} completed={activeSteps>=i?true:false}>
        <StepLabel style={{color:activeSteps>=i?"royalblue":"rgba(0, 0, 0, 0.649)"}} icon={step.icon}>
            {step.label}
        </StepLabel>
        </Step>
    ))
}
    </Stepper>
    </>
  )
}

export default CheckoutSteps