import {
  createContext,
  useCallback,
  useContext as useNativeContext,
  useState,
} from "react"

const initialList = [
  {
    id: 1,
    name: "initialList",
    taskDo: 0,
    taskNoDo: 0,
    tasks: [
      {
        idTask: 1,
        description: "Test task 1",
        doTask: 0
      }
    ]
  }
]

export const Context = createContext()

export const useContext = () => useNativeContext(Context)

const ContextProvider = (props) => {
  const [nextId, setNextId] = useState(2)
  const [lists, setLists] = useState(initialList)
  const getNextId = useCallback(() => {
    setNextId(nextId + 1)

    return nextId
  }, [nextId])
  const createList = useCallback(
    (list) => {
      setLists((lists) => [
        ...lists,
        {
          id: getNextId(),
          ...list,
        },
      ])
    },
    [getNextId]
  )
  const deleteList = useCallback(
    (listId) => setLists((lists) => lists.filter(({ id }) => id !== listId)),
    []
  )
  const updateList = useCallback((updatedList) => {
    setLists((lists) =>
      lists.map((list) => (list.id === updatedList.id ? updatedList : list))
    )
  }, [])
  
  const createTask = useCallback((task, listId) => {
    setLists((lists) =>
      // eslint-disable-next-line no-console
      (lists.map((list) => (list.id === listId ? console.log(list) : console.log(null)))))
  },[])
  

  const updateTask = useCallback((updatedTask, listId, taskId) => {
    // eslint-disable-next-line no-console
    console.log(listId)
    setLists((lists) =>
      lists.map((list) => (list.id === listId ? list.tasks.map((task) => (task.idTask === taskId ? updatedTask : task)): list))
    )
  }, [])

  return (
    <Context.Provider
      {...props}
      value={{
        lists,
        createList,
        deleteList,
        updateList,
        updateTask,
        createTask
      }}
    />
  )
}

export default ContextProvider