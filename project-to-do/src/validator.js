import * as yup from "yup"

export const nameListValidator = yup.string().label("Name")

export const descriptionTaskValidator = yup.string().label("Description")
