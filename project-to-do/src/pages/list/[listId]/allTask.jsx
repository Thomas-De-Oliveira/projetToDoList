import { useContext } from "@/components/ContextProvider.jsx"
import Page from "@/components/Page.jsx"
import ListTask from "@/components/ListTask"
import { useCallback, useState } from "react"
import LayoutList from "@/components/LayoutList.jsx"
import { useRouter } from "next/router.js"


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
  const { lists, updateCheckBoxTask, deleteTask, deleteList } = useContext()
  const router = useRouter()
  const [filter, setFilter] = useState("allTask")
  const handleChange = useCallback(
    (values) => {
      const check = values.currentTarget.checked
      const taskId = Number.parseInt(
        values.currentTarget.getAttribute("data-task-id"),
        10
      )
      const changeDoTask = check === true ? 1 : 0
      updateCheckBoxTask(changeDoTask, listId, taskId)
    },
    [listId, updateCheckBoxTask]
  )

  const handleDelete = useCallback(
    (event) => {
      const taskId = Number.parseInt(
        event.currentTarget.getAttribute("data-task-id"),
        10
      )
      deleteTask(listId, taskId)
    },
    [deleteTask, listId]
  )

  const handleDeleteList = useCallback(
    () => {
      deleteList(listId)
      router.push("/")
    },
    [deleteList, listId, router]
  )

  const handleChangeFilter = useCallback((event) => {
   setFilter(event.currentTarget.getAttribute("name") === "allTask" ? "notDoTask" : "allTask")
  },[]
  )

  return (
    <Page>
      <LayoutList className="flex flex-wrap"
        listId={listId}
        onClick={handleDeleteList}
        filter={filter}
        onClickFilter={handleChangeFilter}>
      </LayoutList>
      <ListTask onChange={handleChange}
        initialValues={lists.find(({ id }) => id === listId)}
        onClick={handleDelete}
        listId={listId}
        filter = {filter}
      />
    </Page>
  )
}

export default ListTaskPage