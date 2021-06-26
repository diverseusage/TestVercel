export const getEnvValue = (key: string): string => {
  try {
    return process.env[key] ?? "";
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
}

export const parseEnvJson = (key: string): any => {
  const jsonString = getEnvValue(key);
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    console.log(error);
  }
}

export const parseEnvBase64Json = (key: string): any => {
   const base64JsonString = getEnvValue(key);
   const decodedString = Buffer.from(base64JsonString, "base64").toString("ascii");
   try {
     return JSON.parse(decodedString)
   } catch (error) {
    console.log(error);
   }
}
