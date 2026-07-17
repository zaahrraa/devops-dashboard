// lib/logger.js
import AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION || 'us-east-1',
  endpoint: process.env.AWS_ENDPOINT_URL || 'http://host.docker.internal:4566',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'test',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'test',
});

const cloudwatch = new AWS.CloudWatchLogs();
const LOG_GROUP = '/ecs/devops-dashboard';
const LOG_STREAM = 'app-logs';

async function ensureLogStream() {
  try {
    await cloudwatch.createLogStream({
      logGroupName: LOG_GROUP,
      logStreamName: LOG_STREAM,
    }).promise();
    console.log('✅ Log stream created');
  } catch (error) {
    if (error.code === 'ResourceAlreadyExistsException') {
      return;
    }
    console.error('❌ Failed to create log stream:', error);
    throw error;
  }
}

async function getSequenceToken() {
  const response = await cloudwatch
    .describeLogStreams({
      logGroupName: LOG_GROUP,
      logStreamNamePrefix: LOG_STREAM,
    })
    .promise();

  const stream = response.logStreams?.find((s) => s.logStreamName === LOG_STREAM);
  return stream?.uploadSequenceToken;
}

export async function logToCloudWatch(message) {
  console.log('📤 logToCloudWatch called with:', message);

  try {
    await ensureLogStream();
    const sequenceToken = await getSequenceToken();

    const params = {
      logGroupName: LOG_GROUP,
      logStreamName: LOG_STREAM,
      logEvents: [{
        timestamp: Date.now(),
        message: String(message),
      }],
      ...(sequenceToken ? { sequenceToken } : {}),
    };

    console.log('📤 Sending to CloudWatch:', JSON.stringify(params));

    await cloudwatch.putLogEvents(params).promise();
    console.log('✅ Log sent to CloudWatch:', message);
  } catch (error) {
    console.error('❌ Failed to send log to CloudWatch:', error);
  }
}
