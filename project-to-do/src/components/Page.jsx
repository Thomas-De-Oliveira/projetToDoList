import Link from "@/components/Link.jsx"
import Head from "next/head"
import { useContext } from "@/components/ContextProvider.jsx"

const Page = (props) => {
  const { title,children, ...otherProps } = props
  const { lists } = useContext()
  // eslint-disable-next-line no-console
  console.log(Object.values(lists))


  return (
    <main className="flex" {...otherProps}>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav>
          <ul>
            {Object.values(lists).map((value,index) => (
              <li key={index}><Link href={`/list/${value["id"]}/allTask`}>{value["name"]}</Link></li>
            ))}
            <li><Link href="/list/addList">+</Link></li>
          </ul>
        </nav>
      </header>
      <section>{children}</section>
    </main>
  )
}

export default Page