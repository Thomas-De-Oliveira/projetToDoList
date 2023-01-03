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
    taskNoDo: 1,
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
          taskNoDo: 1,
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

  const updateCheckBoxTask = useCallback(
    (changeDoTask, listId, taskId) => {
      setLists((lists) =>
      (lists.map((list) => (list.id === listId ? list.tasks.map((task) =>
        task.idTask === taskId ? (changeDoTask === 1 ?
          { ...list, taskDo: list.taskDo + 1, taskNoDo: list.taskNoDo - 1, ...list.tasks.splice(list.tasks.findIndex(({ idTask }) => idTask === taskId), 1, { ...task, doTask: 1 })}
        : { ...list, taskDo: list.taskDo - 1 , taskNoDo: list.taskNoDo + 1 , ...list.tasks.splice(list.tasks.findIndex(({ idTask }) => idTask === taskId), 1,{...task, doTask: 0})} ) : list)[list.tasks.findIndex(({ idTask }) => idTask === taskId)] : list) )))
  }, [])
  
  const deleteTask = useCallback(
    (listId, taskId) => {
      setLists((lists) => (lists.map((list) => list.id === listId ? list.tasks.map((task) =>
        task.idTask === taskId ? (task.doTask === 1 ? { ...list, taskDo: list.taskDo - 1, tasks: list.tasks.filter(({ idTask }) => idTask !== taskId) }
          : { ...list, taskNoDo: list.taskNoDo - 1, tasks: list.tasks.filter(({ idTask }) => idTask !== taskId) })
          : list)[list.tasks.findIndex(({ idTask }) => idTask === taskId)] : list)))
    },[])
  
  const createTask = useCallback((task, listId) => {
    setLists((lists) =>
    (lists.map((list) => (list.id === listId ?
      { ...list,  taskNoDo: list.taskNoDo + 1, ...list.tasks.push({ idTask: getNextIdTask(), ...task, doTask: 0 })} : list)))
  )},[getNextIdTask])
  

  const updateTask = useCallback((updatedTask, listId, taskId) => {
    setLists((lists) =>
      lists.map((list) => (list.id === listId ? (list.tasks.map((task) => task.idTask === taskId ? { ...list, ...list.tasks.splice(list.tasks.findIndex(({ idTask }) => idTask === taskId), 1, { ...updatedTask}) } : list ))[list.tasks.findIndex(({ idTask }) => idTask === taskId)] : list))
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
        updateCheckBoxTask,
        deleteTask
      }}
    />
  )
}

export default ContextProvider