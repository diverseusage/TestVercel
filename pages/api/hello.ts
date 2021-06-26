// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { storage } from '../../firebase'
import { v4 as generateUuid } from 'uuid';
import mimeLookup from 'mime-types';
import { base } from '../../server/image'

type Data = {
  name: string
}

const FIREBASE_STORAGE_UPLOAD_DIRECTORY= "uploads";
const base64String = base === null ? "" : base.toString();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const mimeType = base64String?.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
  const fileExtension = mimeLookup.extension(mimeType)
  const fileName = `${generateUuid()}.${fileExtension}`;
  const base64EncodedImageString = base64String.split(';base64,').pop();
  const imageBuffer = Buffer.from(base64EncodedImageString, 'base64');

  let bucket = storage.bucket();
  const file = bucket.file(`${FIREBASE_STORAGE_UPLOAD_DIRECTORY}/${fileName}`);
  file.save(imageBuffer, {
    metadata: { 
      metadata: {
        contentType: mimeType,
        firebaseStorageDownloadTokens: generateUuid()
      }
    },
    public: true,
    validation: 'md5'
  }, (error) => {
      if (error) {
          console.log(error)
      }
  });
  res.status(200).json({ name: 'John Doe' })
}
