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
        description: "Initial Task",
        doTask: 0
      }
    ]
  }
]

export const Context = createContext()

export const useContext = () => useNativeContext(Context)

const ContextProvider = (props) => {
  const [nextId, setNextId] = useState(2)
  const [nextIdTask, setNextIdTask] = useState(2)
  const [lists, setLists] = useState(initialList)
  const getNextId = useCallback(() => {
    setNextId(nextId + 1)

    return nextId
  }, [nextId])
  const getNextIdTask = useCallback(() => {
    setNextIdTask(nextIdTask + 1)

    return nextIdTask
  }, [nextIdTask])

  const createList = useCallback(
    (list) => {
      setLists((lists) => [
        ...lists,
        {
          id: getNextId(),
          ...list,
          taskDo: 0,
          taskNoDo: 0,
          tasks: [{
            idTask: 1,
            description: "initial Task",
            doTask: 0,
          }]
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

  const updateCheckBoxTask = useCallback((updatedTask, idList) => {
    setLists((lists) =>
      lists.map((list) => (list.id === idList ?
        list.tasks.map((task) => (task.idTask === updatedTask.idTask ? updatedTask : task)) : list))
    )}, [])
  
  const createTask = useCallback((task, listId) => {
    // eslint-disable-next-line no-console
    console.log(lists)
    setLists((lists) =>
    (lists.map((list) => (list.id === listId ?
      {...list, ...list.tasks.push({ idTask: getNextIdTask(), ...task, doTask: 0 }) } : list)))
  )},[])
  

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
        createTask,
        updateCheckBoxTask
      }}
    />
  )
}

export default ContextProvider