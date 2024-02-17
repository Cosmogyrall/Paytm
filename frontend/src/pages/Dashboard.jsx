import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard(){
    return(
        <div className="h-screen">
            <Appbar />
            <Balance />
            <Users />
        </div>
    )
}