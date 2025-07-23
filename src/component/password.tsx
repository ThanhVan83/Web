  import { useState } from "react"

  import {CheckCircle,Circle} from "lucide-react"
  
  function Password(){
     const [password,setPassword] = useState("")
     const [isFocused,setIsFocused] = useState(false)
     

       const rules = [
    {
      label: "Have at least one uppercase letter",
      test: (pwd:string) => /[A-Z]/.test(pwd),
    },
    {
      label: "Have at least one lowercase letter",
      test: (pwd:string) => /[a-z]/.test(pwd),
    },
    {
      label: "Have at least one number",
      test: (pwd:string) => /[0-9]/.test(pwd),
    },
    {
      label: "Have at least one special character (@#$%^&*)",
      test: (pwd:string) => /[@#$%^&*!]/.test(pwd),
    },
    {
      label: "Longer than 8 characters",
      test: (pwd:string) => pwd.length > 8,
    },
  ];
     

    return(
        <>
        <div className=" flex justify-center items-center">
            <div className="w-[1219px] mb-8 ">
          <div className="flex items-center pl-40 bg-[#181818] h-[283px] rounded-tl-[50px] rounded-tr-[50px] mt-2.5 mb-2.5">
            <h2 className="text-white font-bold text-8xl ">Password Input</h2>
          </div>

          <div className="h-[907px] bg-[#181818] flex flex-col justify-center items-center ">

           


         <div className="w-[800px] relative">
              <label className=" inline-block w-[100px] text-[15px] font-[400] text-gray-400 ">Active (Typing)</label>
              <input className=" text-gray-400 w-[335px] h-[38px] border-2  rounded-md p-1.5 ml-20 mb-8 hover:text-white focus:outline-none focus:border-sky-500 transition-colors " 
                     placeholder="Password"
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     onFocus={()=>setIsFocused(true)}
                     onBlur={() => setIsFocused(false)}
                     />

                <span className="absolute text-gray-500 text-[12px] bg-[#181818] top-[-8px] left-[198px]">Password</span>
               
               {isFocused && <div className="absolute top-full left-[178px] w-[335px] bg-[#242424] rounded-[8px] p-4 text-sm mt-2 z-10">
  {rules.map((rule, index) => {
    const passed = rule.test(password);
    return (
      <div key={index} className="flex items-center gap-2 mb-1">
        {passed ? (
          <CheckCircle className="text-blue-400 w-4 h-4" />
        ) : (
          <Circle className="text-gray-500 w-4 h-4" />
        )}

        <span
          className={`${passed ? "text-white" : "text-gray-500"} transition`}
        >
          {rule.label}
        </span>
      </div>
    );
  })}
</div>}


            </div>



            
          </div>

        </div>
        </div>
        
        </>
    )
  }

  export default Password ;