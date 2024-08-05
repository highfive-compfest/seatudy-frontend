export function Submit({name}:{name:string}) {
    return (
        <button type="submit" className={`hover:bg-blue-600 bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-xl w-full`}>{name}</button>
    )
}