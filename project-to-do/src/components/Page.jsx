import Link from "@/components/Link.jsx"
import Head from "next/head"
import { useContext } from "@/components/ContextProvider.jsx"
import { PlusIcon } from "@heroicons/react/24/solid"


const Page = (props) => {
  const { title,children, ...otherProps } = props
  const { lists } = useContext()


  return (
    <main className="flex flex-col" {...otherProps}>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav>
          <ul className="flex flex-nowrap overflow-x-auto border-b-4 border-slate-200">
            {Object.values(lists).map((value,index) => (
              <li key={index} className="flex flex-nowrap flex-none p-2 rounded-t-lg border-solid border-2 border-slate-200">
                <Link className="flex items-center" href={`/list/${value["id"]}/allTask`}>{value["name"]}</Link><span className="bg-lime-400 p-1 ml-1 rounded-l-lg">{value["taskDo"]}</span>
                <span className="bg-red-500 p-1 rounded-r-lg">{value["taskNoDo"]}</span></li>
            ))}
            <li className="flex items-center ml-5 p-2 rounded-t-lg border-solid border-2 border-slate-200"><Link href="/list/addList"><PlusIcon className="w-4"/></Link></li>
          </ul>
        </nav>
      </header>
      <section className="flex flex-col justify-start">{children}</section>
    </main>
  )
}

export default Page