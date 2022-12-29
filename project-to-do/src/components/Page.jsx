import Link from "@/components/Link.jsx"
import Head from "next/head"
import { useContext } from "@/components/ContextProvider.jsx"

const Page = (props) => {
  const { title,children, ...otherProps } = props
  const { lists } = useContext()


  return (
    <main className="flex" {...otherProps}>
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav>
          <ul>
            {lists.map(({ id, name }) => (
              <li key={id}><Link href={`/list/${id}/allTask`}>{name}</Link></li>
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