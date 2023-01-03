import Input from "@/components/Input.jsx"
import classNames from "classnames"
import { useField } from "formik"

const FormFieldCheckbox = (props) => {
  const {
    Component = Input,
    name,
    label,
    placeholder,
    className,
    ...otherProps
  } = props
  
  const [field] = useField({ name })

  return (
    <Component
    className={classNames(className)}
      {...field}
        {...otherProps}
        placeholder={placeholder ?? label}
      />
  )
}

export default FormFieldCheckbox