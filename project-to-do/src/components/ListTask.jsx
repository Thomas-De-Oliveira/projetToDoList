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
  tasks: [{
            idTask: 1,
            description: "initial Task",
            doTask: 0,
          }]
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
          {Object.values(initialValues.tasks).map((value, index) => (
            <li key={index}><FormField type="checkbox" data-list-id={initialValues.id}
              data-task-id={value["idTask"]} name="doTask" value={value["doTask"]} onChange={onChange} /> {value["description"]} </li>
          ))}
    </ul>
    </Form>
    </Formik>
     )
}

export default ListTask