import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button } from './Button'
import { Navigate, useNavigate } from 'react-router-dom'

export function Users(){
    //users state variable
    const [users, setUsers] = useState([
        {
            firstName : "Yash",
            lastName : "Khairnar",
            _id : 1
        }
    ])
    const [filter,setFilter] = useState("")

    useEffect(()=>{
        axios.get('http://localhost:3000/api/v1/user/bulk?filter='+filter)
        .then(res=>{
            setUsers(res.data.users)
        })
    },[filter])

    return(
        <>
        <div className="font-bold mt-6 ml-4">
            Users
        </div>
        <div className='m-4'>
            <input type="text" placeholder='Search users..' onChange={e=>{setFilter(e.target.value)}} className='shadow-lg shadow-blue-200 w-full' />
        </div>
        <div>
            {users.map( person=> <User key={person._id} person={person} />)}
        </div>
        </>
    )
}

//how the user tab in bulk users should look like
function User({person}){
    const navigate = useNavigate()
    return(
       <div className="flex justify-between mx-4">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {person.firstName[0].toUpperCase()}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {person.firstName} {person.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button onPress={e=>{
                navigate('/sendmoney?id='+ person._id + "&name="+person.firstName)
            }} label={"Send Money"} />
        </div>
    </div>
    )
}