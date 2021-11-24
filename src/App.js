import React, { useState } from "react"
import currencyConverter from "./utils/currencyConverter"
import Notification from "./components/Notification"
import InputForm from "./components/InputForm"
import OutputDiv from "./components/OutputDiv"

const App = () => {
  const [outputStr, setOutputStr] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  return (
    <div>
      {errorMessage
      ?  <Notification notifString={errorMessage}/>
      : null}
      <InputForm setErrorMessage={setErrorMessage} setOutputStr={setOutputStr}/>
      <OutputDiv outputStr={outputStr} />
    </div>
  )
}

export default App