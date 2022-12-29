import FormField from "@/components/FormField.jsx"
import { nameListValidator } from "@/validator.js"
import classNames from "classnames"
import { Form, Formik } from "formik"
import * as yup from "yup"

const defaultValidationSchema = yup.object().shape({
  name: nameListValidator.required(),
})

const defaultInitialValues = {
  name: "",
}

const ListTask = (props) => {
  const {
    className,
    onChange,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
  } = props
  
  return (
<Formik
      onChange={onChange}
      initialValues={initialValues}
      validationSchema={validationSchema}
>
  <Form className={classNames("flex flex-col gap-4 p-4", className)}>
      <ul>
          {initialValues.tasks.map(({ idTask, description, doTask }) => (
            <li key={idTask}><FormField type="checkbox" data-list-id={ initialValues.id } data-task-id={idTask} name="doTask" value={doTask} onChange={onChange}
              { ...doTask === 1 ? "checked" : ""} /> {description} </li>
          ))}
    </ul>
    </Form>
    </Formik>
     )
}

export default ListTask