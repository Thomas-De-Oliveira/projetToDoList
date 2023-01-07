
import classNames from "classnames"

const variants = {
  primary: "bg-blue-600 active:bg-blue-700 text-white",
  transparent: "text-black"
}

const sizes = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base font-semibold",
  tr: "p-1"
}

const Button = (props) => {
  const { variant = "primary", size = "md", className, ...otherProps } = props

  return (
    <button
      className={classNames(variants[variant], sizes[size], className)}
      {...otherProps}
    />
  )
}

export default Button