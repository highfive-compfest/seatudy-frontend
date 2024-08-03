export function Submit({name}:{name:string}) {
    return (
        <button type="submit" className={`hover:bg-slate-800 bg-slate-900 text-slate-200 px-4 py-2 rounded-full font-bold text-xl w-full`}>{name}</button>
    )
}