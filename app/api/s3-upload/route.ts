import { NextResponse } from "next/server";

import {
  S3Client,
  PutObjectCommand,
  //  ListObjectsCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function uploadFileToS3(file: any, fileName: any) {
  const fileBuffer = file;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `videos/${fileName}`,
    Body: fileBuffer,
    ContentType: "video/mp4",
  };

  const command = new PutObjectCommand(params);

  await s3Client.send(command);

  // Former before cloudfront
  //  const url = `https://s3.amazonaws.com/${process.env.AWS_BUCKET_NAME}/videos/${fileName}`;

  // After cloudfront
  const url = `https://d2q3rw0ca832q8.cloudfront.net/videos/${fileName}`;

  return url;
}

export async function POST(request: any) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "File is required" }, { status: 400 });
    }

    const bufferFile = await file.arrayBuffer();

    const buffer = Buffer.from(bufferFile);

    const fileName = await uploadFileToS3(buffer, file.name);

    console.log(fileName);

    return NextResponse.json({ success: true, fileName });
  } catch (error: any) {
    return NextResponse.json({ message: error.message });
  }
}
