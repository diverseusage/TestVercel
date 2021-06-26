import * as admin from "firebase-admin";
import { getFirebaseConfig, getFirebaseServiceAccount } from "./server/configurations";

const firebaseConfig = getFirebaseConfig();
const firebaseServiceAccount = getFirebaseServiceAccount();

const settings = {
  ...firebaseConfig,
  credential: admin.credential.cert(firebaseServiceAccount),
};

if (!admin.apps.length) {
  admin.initializeApp(settings);
}else {
  admin.app(); // if already initialized, use that one
}

export const storage = admin.storage();
