import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  endpoint: 'http://host.docker.internal:4566'
});

const getAsset = async (key) => {
  const result = await s3.getObject({
    Bucket: 'devops-assets',
    Key: key
  }).promise();
  return result.Body.toString();
};