import FormFieldCheckbox from "@/components/FormFieldCheckbox"
import { nameListValidator } from "@/validator.js"
import classNames from "classnames"
import { Form, Formik } from "formik"
import * as yup from "yup"
import { TrashIcon } from "@heroicons/react/24/solid"
import Button from "./Button"
import Link from "./Link"

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
    onClick,
    listId,
    filter,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
  } = props
  
  return (
    <div>
<Formik
      onChange={onChange}
      onClick={onClick}
      initialValues={initialValues}
      validationSchema={validationSchema}
>
  <Form className={classNames("flex flex-col gap-4", className)}>
      <ul className="flex flex-col">
          {Object.values(initialValues.tasks).map((value, index) => (
            <li key={index} className={filter === "notDoTask" ? value["doTask"] === 1 ? "hidden" : "flex flex-wrap border-b-2 border-slate-200 mt-2" : "flex flex-wrap border-b-2 border-slate-200 mt-2"}>
              <FormFieldCheckbox className="p-2 m-2" checked={value["doTask"] === 1 ? "checked" : ""} type="checkbox" data-list-id={initialValues.id}
              data-task-id={value["idTask"]} name="doTask" value={value["doTask"]} onChange={onChange} /><Link className="flex flex-grow" href={`/list/${listId}/${value["idTask"]}/editTask`}> {value["description"]}</Link>
              <Button type="button" className="rounded-full mx-4 flex justify-end opacity-0 hover:opacity-100" variant="transparent" size="tr" data-task-id={value["idTask"]} onClick={onClick}><TrashIcon className="w-4" /></Button> </li>
          ))}
    </ul>
    </Form>
      </Formik>
      </div>
     )
}

export default ListTask