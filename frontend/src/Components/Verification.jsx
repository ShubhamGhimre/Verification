import React, { useRef, useState } from "react";

const Verification = () => {
  const [codes, setCodes] = useState(Array(6).fill(""));
  const inputRefs = useRef(Array(6).fill(null));


  const handleInputChange = (index, value) => {
    const newValue = value.replace(/[^0-9]/g, "");
    const newCodes = [...codes];
    newCodes[index] = newValue;
    setCodes(newCodes);
    
    const fullCode = newCodes.join('');
    console.log(fullCode);
 
   
    if (index < codes.length - 1 && newValue !== "") {
        inputRefs.current[index + 1].focus();
      } else if (index > 0 && newValue === "") { // Focus previous input on backspace at beginning
        inputRefs.current[index - 1].focus();
      }
  };

  const handleKeyDown = (index, event) => {
    // Handle backspace (key code 8) to remove values
    if (event.keyCode === 8 && codes[index] === "") {
      if (index > 0) {
        // Clear previous input and focus it
        const newCodes = [...codes];
        newCodes[index - 1] = "";
        setCodes(newCodes);
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData('text/plain');
    const extractedData = pastedText.match(/\d{6}/)?.[0];
    if(extractedData){
        const newCode = extractedData.split(''
        );
        setCodes(newCode);
    }
}


 
  return (
    <div className="flex flex-col justify-center items-center bg-slate-100 w-screen h-screen gap-10">
      <h1 className="text-xl flex items-center text-slate-900 ">
        Verification Code :{" "}
      </h1>
      <div className="flex gap-4 ">
        {codes.map((code, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={code}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onPaste={handlePaste}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(input) => (inputRefs.current[index] = input)}
            className={`input_field`}
          />
        ))}
      </div>
      <button className="p-3 bg-blue-500 text-slate-100 rounded-lg text-lg">
        Submit
      </button>
    </div>
  );
};

export default Verification;
