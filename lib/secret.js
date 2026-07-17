// lib/secrets.js
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  endpoint: 'http://host.docker.internal:4566',
  accessKeyId: 'test',
  secretAccessKey: 'test'
});

const secretsmanager = new AWS.SecretsManager();

export async function getDbPassword() {
  try {
    const result = await secretsmanager.getSecretValue({
      SecretId: 'devops-dashboard-db-password'
    }).promise();
    return result.SecretString;
  } catch (error) {
    console.error('❌ Failed to fetch secret from Floci:', error);
    return null;
  }
}