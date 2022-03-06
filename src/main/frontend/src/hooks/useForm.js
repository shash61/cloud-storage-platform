import React from "react";

function useForm(handleRegister){
    console.log(handleRegister)
    const [state, setState]=React.useState({})
    
    function handleSubmit(e){
        e.preventDefault()
        handleRegister()
    }

    function handleChange(e){
      console.log(e.target.value)
      e.persist()
      setState((prev)=>(
          {...prev, [e.target.name]:e.target.value}
      ))
    }

    function allClear(){
        setState({})
    }
    console.log(state)
    return [state,handleChange,handleSubmit, allClear ]

}

export default useForm