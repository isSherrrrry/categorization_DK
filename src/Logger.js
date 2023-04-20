import { Logging } from '@google-cloud/logging';

// Replace the path below with the path to your Service Account key JSON file.
const keyFilename = './key.json';

const logging = new Logging({ projectId: 'dkeffect', keyFilename });

// Replace 'my-log' with the desired log name.
const log = logging.log('my-log');

// Create a logging function
const logEvent = async (level, message) => {
  const metadata = {
    resource: { type: 'global' },
    severity: level,
  };
  const entry = log.entry(metadata, message);
  await log.write(entry);
};

export default logEvent;
