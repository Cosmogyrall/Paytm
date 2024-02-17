import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from 'axios'

export const SignUp = () => {
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    return <div className="bg-slate-400 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">

        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox placeholder="John" label={"First Name"} onChangeFn={e=>{setFirstName(e.target.value)}} />
        <InputBox placeholder="Doe" label={"Last Name"} onChangeFn={e=>{setLastName(e.target.value)}} />
        <InputBox placeholder="example@gmail.com" label={"Email"}  onChangeFn={e=>{setEmail(e.target.value)}}/>
        <InputBox placeholder="dontcopythis" label={"Password"}  onChangeFn={e=>{setPassword(e.target.value)}}/>

        <div className="pt-4">
          {/* send post request to /signup on backend */}
          <Button label={"Sign up"} onPress={async()=>{
            //async function 
            const res = await axios.post('http://localhost:3000/api/v1/user/signup',{
              userName : email,
              firstName : firstName,
              lastName : lastName,
              password : password
            })
            //store the jwt token in the local storage for future requests
            localStorage.setItem("JWT_token",res.data.token)
          }}
          />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />

      </div>
    </div>
  </div>
}