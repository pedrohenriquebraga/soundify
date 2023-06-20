function getFileType(mimeType: string) {
  const [type] = mimeType.split("/");

  return type;
}

async function getAllFiles() {
}

export { getFileType, getAllFiles };
