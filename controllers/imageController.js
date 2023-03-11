const uploadImage = async (req, res) => {
  try {
    await imageValidator.uploadImageSchema.validate(req.files, { abortEarly: false })
  } catch (error) {
    return res.status(400).json(getPreparedErrorsFromYup(error))
  }
}
export const imageController = {
  uploadImage,
}