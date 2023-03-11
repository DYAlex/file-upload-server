import * as yup from 'yup'

const uploadImageSchema = yup.object().shape({
  file: yup
    .mixed()
    .required("You need to provide a file")
    .test("mimetype", "Only the following formats are accepted: .jpeg, .jpg, .bmp, .png", (value) => {
        return value && (
            value.mimetype === "image/jpeg" ||
            value.mimetype === "image/bmp" ||
            value.mimetype === "image/png"
        );
    }),
})

export const imageValidator = {
  uploadImageSchema,
}
