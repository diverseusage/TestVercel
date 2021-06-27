// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { storage, firestore } from "../../firebase";
import { v4 as generateUuid } from "uuid";
import mimeLookup from "mime-types";
import { base } from "../../server/image";

type Data = {
  name: string;
};

const uploadPhoto = () => {
  const FIREBASE_STORAGE_UPLOAD_DIRECTORY = "uploads";
  const base64String = base === null ? "" : base.toString();

  const mimeType = base64String?.match(
    /data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/
  )[1];
  const fileExtension = mimeLookup.extension(mimeType);
  const fileName = `${generateUuid()}.${fileExtension}`;
  const base64EncodedImageString = base64String.split(";base64,").pop();
  const imageBuffer = Buffer.from(base64EncodedImageString, "base64");

  console.log("Before getting bucket");
  let bucket = storage.bucket();
  console.log(
    "Bucket path: ",
    `${FIREBASE_STORAGE_UPLOAD_DIRECTORY}/${fileName}`
  );
  const file = bucket.file(`${FIREBASE_STORAGE_UPLOAD_DIRECTORY}/${fileName}`);

  console.log("Before save file");
  try {
    file.save(
      imageBuffer,
      {
        metadata: {
          metadata: {
            contentType: mimeType,
            firebaseStorageDownloadTokens: generateUuid(),
          },
        },
        public: true,
        validation: "md5",
      },
      (error) => {
        if (error) {
          console.log("IN SAVE error", error);
        }
      }
    );
  } catch (error) {
    console.log("CATCH ERROR IS: ", error)
  }
}

const readFromFirebase = async () => {
  try {
    const response = await firestore.collection("FeedPosts").orderBy("timestamp", "desc").get()
    console.log("ReadFromFirebase-RESPONSE", response)
    return response;
  }
  catch (error) {
    console.log("ReadFromFirebase-ERROR:", error)
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  
  // uploadPhoto();
  readFromFirebase();

  res.status(200).json({ name: "John Doe" });
}
