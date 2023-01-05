import ListForm from "@/components/ListForm"
import { useContext } from "@/components/ContextProvider.jsx"
import Page from "@/components/Page.jsx"
import { useCallback } from "react"
import { useRouter } from "next/router.js"

const IndexPage = () => {
  const { createList } = useContext()
  const router = useRouter()
  const handleClickCreate = useCallback(
    (values) => {
      createList(values)
      router.push("/")
    },
    [router,createList]
  )

  return (
    <Page title="Add To do List">
      <ListForm onSubmit={handleClickCreate} />
    </Page>
  )
}

export default IndexPage