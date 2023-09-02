import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-slate-600 h-full p-4 flex flex-col items-center">
      <header className="text-gray-100 text-2xl">
        Hello, I am under the water, Please help me. here too much raining
      </header>
      <Link className="text-white underline hover:text-gray-400 p-2" href={'/videocall'}>
        Do a video Call?
      </Link>
    </main>
  )
}
