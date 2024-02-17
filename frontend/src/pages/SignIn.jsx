import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const SignIn = () => {
    return <div className="bg-slate-400 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign In"} />
        <SubHeading label={"Enter your infromation to login to your account"} />
        <InputBox placeholder="example@gmail.com" label={"Email"} />
        <InputBox placeholder="dontcopythis" label={"Password"} />
        <div className="pt-4">
          <Button label={"Sign In"} />
        </div>
        <BottomWarning label={"New to this app?"} buttonText={"Sign Up"} to={"/signup"} />
      </div>
    </div>
  </div>
}