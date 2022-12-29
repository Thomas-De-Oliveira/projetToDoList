import Button from "@/components/Button.jsx"
import FormField from "@/components/FormField.jsx"
import { descriptionTaskValidator } from "@/validator.js"
import classNames from "classnames"
import { Form, Formik } from "formik"
import * as yup from "yup"

const defaultValidationSchema = yup.object().shape({
  description: descriptionTaskValidator.required(),
})

const defaultInitialValues = {
  description: "",
}

const TaskForm = (props) => {
  const {
    className,
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
  } = props

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form className={classNames("flex flex-col gap-4 p-4", className)}>
        <FormField name="description" data-list-id={initialValues.id} type="text" label="Description" />
        <Button type="submit" className="mt-8">
          Add Task
        </Button>
      </Form>
    </Formik>
  )
}

export default TaskForm