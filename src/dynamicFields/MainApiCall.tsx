import axios from "axios";
import { useState } from "react";

const MainApiCall = () => {
  const GPT_KEY = "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";
  let basePrompt = `give me 2 to 3 hadith that talk about the importance of the Quran from sahih al bukhari and sahih muslim`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${GPT_KEY}`,
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    let prompt = `${basePrompt}`;
    try {
      const response = await axios.post<any>(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt: basePrompt,
          temperature: 0,
          max_tokens: 550,
        },
        {
          headers: headers,
        }
      );

      console.log("response: ", response.data.choices[0].text);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  return <div onClick={handleSubmit}>MainApiCall</div>;
};

export default MainApiCall;
