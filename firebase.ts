import * as admin from "firebase-admin";
import { getFirebaseConfig, getFirebaseServiceAccount } from "./server/configurations";

const firebaseConfig = getFirebaseConfig();
const firebaseServiceAccount = getFirebaseServiceAccount();

console.log("firebase config", firebaseConfig)

const settings = {
  ...firebaseConfig,
  credential: admin.credential.cert(firebaseServiceAccount),
};

if (!admin.apps.length) {
  admin.initializeApp(settings);
}

export const storage = admin.storage();
