import { useContext } from "@/components/ContextProvider.jsx"
import Page from "@/components/Page.jsx"
import ListForm from "@/components/ListForm"
import { useRouter } from "next/router.js"
import { useCallback } from "react"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      listId: Number.parseInt(params.listId, 10),
    },
  },
})

const EditPage = (props) => {
  const {
    params: { listId },
  } = props
  const { lists, updateList } = useContext()
  const router = useRouter()

  const handleSubmit = useCallback(
    (values) => {
      updateList(values)
      router.push(`/list/${listId}/allTask`)
    },
    [updateList, router, listId]
  )

  return (
    <Page>
      <ListForm onSubmit={handleSubmit}
      initialValues={lists.find(({ id }) => id === listId)} />
    </Page>
  )
}

export default EditPage