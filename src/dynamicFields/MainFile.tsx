import axios from 'axios'
import React, { useState } from 'react'
const GPT_KEY ="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"
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GPT_KEY}`
  }
  const MainFile = () => {
    const [pointsOfInterest, setPointsOfInterest] = useState(null)
    const [pointsOfInterestPrompt, setPointsOfInterestPrompt] = useState("")


    const handleSubmit = async (event:any) => {
        event.preventDefault()
        const response = await axios.post('/api/getPointsOfInterest', { pointsOfInterestPrompt }, { headers })
        setPointsOfInterest(response.data.pointsOfInterest)
      }


  return (
    <div>MainFile</div>
  )
}

export default MainFile