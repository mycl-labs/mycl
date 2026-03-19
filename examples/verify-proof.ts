import { verifyEnvelope, describeEnvelope } from '../src';

const env = {
  root: '00'.repeat(32),
  leaf: '00'.repeat(32),
  path: [],
  index: 0,
};

try {
  const ok = verifyEnvelope(env);
  console.log(describeEnvelope(env), 'verified=', ok);
} catch (err) {
  console.error('proof rejected:', (err as Error).message);
}
