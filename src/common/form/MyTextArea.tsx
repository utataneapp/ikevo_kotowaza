import { useField } from "formik"
import { FormField, Label } from "semantic-ui-react"

type Props = {
  label?: string
  name: string
  placeholder: string
  maxLength?: number
}

export default function MyTextArea({ label, ...props }: Props) {
  const [field, meta] = useField(props)
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <textarea {...field} {...props} />
      {/* {meta.touched && meta.error ? (
        <Label color="red" basic>
          {`必須項目です`}
        </Label>
      ) : null} */}
    </FormField>
  )
}
