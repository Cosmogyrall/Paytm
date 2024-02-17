export const Balance = ({ value }) => {
    return <div className="shadow flex h-14">
        <div className="flex flex-col justify-center font-bold ml-4">
            Your balance
        </div>
        <div className="flex flex-col justify-center font-semibold ml-4">
            Rs {value}
        </div>
    </div>
}