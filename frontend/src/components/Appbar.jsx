
export function Appbar(){
    return(
        <div className="shadow font-bold text-lg flex justify-between h-16 bg-slate-200">
            <div className="flex flex-col justify-center h-full ml-4">PayTM app</div>
            <div className="flex">
                <div className="flex flex-col justify-center mr-2">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 flex justify-center text-white bg-slate-500 my-2 mr-4">
                    <div className="flex flex-col justify-center h-full">Y</div>
                </div>
            </div>
        </div>
    )
}