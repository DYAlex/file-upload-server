const getImageFileExtension = (imageName) => {
  return imageName.split('.')[imageName.split('.').length - 1]
}

export const getMd5ImageName = (image) => {
  return `${image.md5}.${getImageFileExtension(image.name)}`
}
