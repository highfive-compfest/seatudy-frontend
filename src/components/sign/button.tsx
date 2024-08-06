import { Spinner } from "@nextui-org/spinner";

export function Submit({name, isPending}:{name:string, isPending:boolean}) {
    if (isPending) {
        return <div className="flex justify-center"><Spinner/></div>
    } else {
        return (    
            <button type="submit" className={`hover:bg-blue-600 bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-xl w-full`}>
                {name}
            </button>
        )
    }
}