export function Hero() {
    return (
        <section className="w-full h-full lg:flex flex-col justify-center items-center relative hidden bg-cover after:bg-slate-900 after:block after:top-0 after:right-0 after:left-0 after:bottom-0 after:absolute after:opacity-50">
            <div style={{ backgroundImage: "url('https://study.com/cimages/multimages/16/8a479f0b-398d-4563-917d-e99bed7a109e_study_group.jpeg')" }} className="absolute inset-0"/>
            <h1 className="text-5xl md:text-7xl text-black z-10 z-1 font-bold"><span className="text-blue-600">SEA</span>TUDY.</h1>
            <h2 className="mt-4 mb-8 text-white font-bold text-2xl z-10 z-1">Self-Paced Learning Courses Online</h2>
        </section>
    )
}
