import { useContext } from "@/components/ContextProvider.jsx"
import Page from "@/components/Page.jsx"
import TaskForm from "@/components/TaskForm"
import { useCallback } from "react"
import { useRouter } from "next/router.js"


export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      listId: Number.parseInt(params.listId, 10),
    },
  },
})

const AddTaskPage = (props) => {
  const {
    params: { listId },
  } = props
  const { createTask } = useContext()
  const router = useRouter()
  const handleAddTask = useCallback(
    (values) => {
      createTask(values, listId)
      router.push(`/list/${listId}/allTask`)
    },
    [router,createTask, listId]
  )

  return (
    <Page>
      <TaskForm onSubmit={handleAddTask} />
    </Page>
  )
}

export default AddTaskPage