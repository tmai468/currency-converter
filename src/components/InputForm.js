import React, { useState } from "react"
import currencyConverter from "../utils/currencyConverter"

const InputForm = ({ setErrorMessage, setOutputStr }) => {
    const [inputNum, setInputNum] = useState('')
    const handleFormChange = (event) => {
        try {
          if (event.target.value.split(".")[1].length > 2) {
            event.target.value = event.target.value.split(".")[0] + "." + event.target.value.split(".")[1].substring(0,2)
            setErrorMessage("100 cents equals a dollar")
            setTimeout(() => setErrorMessage(null), 5000)
          }
          // console.log(Number(event.target.value))
        } catch (exception) {}
        let numVer = Number(event.target.value)
        if (isNaN(numVer)) {
          setErrorMessage('Input has to have valid dollars and cents format')
          setTimeout(() => setErrorMessage(null), 5000)
        } else {
          setInputNum(event.target.value)
        }
      } 
    
      const handleFormSubmit = (event) => {
        event.preventDefault()
        const outStr = currencyConverter(inputNum, setErrorMessage, setInputNum)
        if (outStr !== "Invalid input") {
          setOutputStr(outStr)
        }
        else {
          setInputNum('')
          setErrorMessage(outStr)
          setTimeout(() => setErrorMessage(null), 5000)
        }
      }
    return (
    <form onSubmit={handleFormSubmit}>
        <div>
            Enter number to convert:
            <input 
            value={inputNum}
            onChange={handleFormChange}
            />
        </div>
        <button type="submit">submit</button>
    </form>
    )
}

export default InputForm