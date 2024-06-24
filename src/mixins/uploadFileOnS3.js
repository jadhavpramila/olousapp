export function uploadFileOnS3(
  fileName,
  whereToStore,
  selectedFile,
  FileContentType
) {
  return new Promise((resolve, reject) => {
    let bucketName = import.meta.env.VITE_APP_BUCKETNAME;
    let bucketRegion = import.meta.env.VITE_APP_BUCKETREGION;
    let IdentityPoolId = import.meta.env.VITE_APP_IDENTITYPOOLID;

    // eslint-disable-next-line no-undef
    AWS.config.update({
      region: bucketRegion,
      // eslint-disable-next-line no-undef
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId,
      }),
    });

    // eslint-disable-next-line no-undef
    let s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      params: { Bucket: bucketName },
    });

    let filePath = `${whereToStore}${fileName}`;
    s3.upload(
      {
        Key: filePath,
        Body: selectedFile,
        ACL: "public-read",
        ContentType: FileContentType,
      },
      (err, data) => {
        if (err) {
          reject("Unable to upload image. Please try again later.");
        } else if (data) {
          resolve({
            serverFilePath: data.Location,
            savedFileName: fileName,
          });
        }
      }
    );
  });
}

// deleteFileFromS3(fileName) {
// fileName like media/procudts/ew45w6dsd323g2h3gh.jpg
//   return new Promise((resolve, reject) => {
//     // resolve()
//     AWS.config.update({
//       accessKeyId: process.env.VUE_APP_AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.VUE_APP_AWS_SECRET_ACCESS_KEY_ID,
//       region: process.env.VUE_APP_BUCKETREGION
//     })
//     const s3 = new AWS.S3()
//     var params = {
//       Bucket: process.env.VUE_APP_BUCKETNAME,
//       Key: fileName
//     }
//     s3.deleteObject(params, function (err, data) {
//       if (err) {
//         console.log(err, err.stack)
//         reject()
//       } else {
//         console.log(data)
//         resolve()
//       }
//     })
//   })
// }
