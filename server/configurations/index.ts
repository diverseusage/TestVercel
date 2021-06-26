import { parseEnvJson, parseEnvBase64Json } from './helpers'

export const getFirebaseConfig = () => {
  return parseEnvJson("FIREBASE_CONFIG");
}

export const getFirebaseServiceAccount = () => {
  return parseEnvBase64Json("GCLOUD_CREDENTIALS");
}
