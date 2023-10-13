import { data } from 'autoprefixer';
import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: 'AKIA5FUXJXFEIHM7O4FR',
  secretAccessKey: '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',
  region: 'ap-northeast-1',
});

export const uploadFileToS3 = (file, bucketName, key) => {
    const params = {
      Bucket: bucketName,
      Key: key+file.name,
      Body: file,
      ContentType:'application/pdf'
    };
  
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          console.error('Error uploading file:', err);
          reject(err);
        } else {
          console.log('File uploaded successfully:', data.Location);
          resolve(data.Location);
        }
      });
    });
  };
