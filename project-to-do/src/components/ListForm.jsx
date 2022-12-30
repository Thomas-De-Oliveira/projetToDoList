import Button from "@/components/Button.jsx"
import FormField from "@/components/FormField.jsx"
import { nameListValidator } from "@/validator.js"
import classNames from "classnames"
import { Form, Formik } from "formik"
import * as yup from "yup"

const defaultValidationSchema = yup.object().shape({
  name: nameListValidator.required(),
})

const defaultInitialValues = {
  name: ""
}

const ListForm = (props) => {
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
        <FormField name="name" type="text" label="Name" />
        <Button type="submit" className="mt-8">
          Add List
        </Button>
      </Form>
    </Formik>
  )
}

export default ListForm