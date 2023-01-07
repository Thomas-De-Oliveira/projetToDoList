import { useContext } from "@/components/ContextProvider.jsx"
import Page from "@/components/Page.jsx"
import TaskForm from "@/components/TaskForm"
import { useCallback } from "react"
import { useRouter } from "next/router.js"


export const getServerSideProps = ({ params }) => ({
  props: {
    params: {
      listId: Number.parseInt(params.listId, 10),
      taskId: Number.parseInt(params.taskId, 10),
    },
  },
})

const EditTaskPage = (props) => {
  const {
    params: { listId, taskId },
  } = props
  const { lists, updateTask } = useContext()
  const router = useRouter()
  const handleUpdateTask = useCallback(
    (values) => {
      updateTask(values, listId, taskId)
      router.push(`/list/${listId}/allTask`)
    },
    [router,updateTask, listId, taskId]
  )

  return (
    <Page>
      <TaskForm onSubmit={handleUpdateTask}
        initialValues={lists.find(({ id }) => id === listId)}
        taskId={taskId}
      />
    </Page>
  )
}

export default EditTaskPage