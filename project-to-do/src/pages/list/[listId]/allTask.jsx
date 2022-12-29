import { useContext } from "@/components/ContextProvider.jsx"
import Page from "@/components/Page.jsx"
import ListTask from "@/components/ListTask"
import { useCallback } from "react"
import Link from "@/components/Link"

export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      listId: Number.parseInt(params.listId, 10),
    },
  },
})

const ListTaskPage = (props) => {
  const {
    params: { listId },
  } = props
  const { lists, updateTask } = useContext()
  const handleChange = useCallback(
    (values) => {
      const check = values.currentTarget.checked
      const listId = Number.parseInt(
        values.currentTarget.getAttribute("data-list-id"),
        10
      )
      const taskId = Number.parseInt(
        values.currentTarget.getAttribute("data-task-id"),
        10
      )
      values.currentTarget.value = check === true ? 1 : 0
      updateTask(values, listId, taskId)
    },
    [updateTask]
  )

  return (
    <Page>
      <ListTask onChange={handleChange}
        initialValues={lists.find(({ id }) => id === listId)} />
      <Link href={`/list/${listId}/addTask`}>+</Link>
    </Page>
  )
}

export default ListTaskPage