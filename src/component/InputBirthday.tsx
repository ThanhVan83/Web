import type React from "react";


type InputBirthdayProps ={
    onFocus : () => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
    value : string;
 };

function InputBirthday({onFocus,value,inputRef} : InputBirthdayProps){

 
 



    return(
         <div className="max-w-[800px] relative">
              <label className=" inline-block w-[100px] text-[15px] font-[400] text-gray-400 ">Birthday</label>
              <input className=" text-gray-400 w-[335px]  border-2  rounded-md p-1.5 ml-20 mb-8  focus:outline-none focus:border-white transition-colors " 
                     placeholder="mm/dd/yyyy"
                     type="text"
                     value={value}
                    ref={inputRef}
                     onFocus={onFocus}
                     
                     readOnly
                     
                    />

                <span className="absolute text-gray-500 text-[12px] bg-[#181818] top-[-8px] left-[198px] pl-0.5 pr-0.5">Birthday</span>
                </div>
    );
}
export default InputBirthday;