
import React from 'react'
// import PropTypes from 'prop-types'

function Alert(props) {
    const capitalise=(word)=>{

        const lower=word.toLowerCase();
        
        return lower.charAt(0).toUpperCase() + lower.slice(1);
        
        }
  
    return (

// props.alert &&  ---- means if the props.alert is null then it cannot be further proceeds

//fix alerts div swize to 50px and simply we can adjust the div 

<div style={{height:"50px"}}>
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show` } role="alert">
    <strong>{capitalise(props.alert.type)} :</strong> {props.alert.msg}

  </div>}
  </div>
  )
}

export default Alert