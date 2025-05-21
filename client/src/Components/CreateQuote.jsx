import React, { useState } from 'react'

const CreateQuote = () => {
    const [quote, setQuote] = useState('')

    function handleSubmit(e){
        e.preventDefault()
    }
  return (
    <>
        <input type='text' value={quote} onChange={(e)=> setQuote(e.target.value)} placeholder='Write your qoute'/> 
        <button onClick={handleSubmit}>Submit</button>
    </>
  )
}

export default CreateQuote
