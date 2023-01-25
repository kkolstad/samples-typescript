// @@@SNIPSTART typescript-hello-workflow
import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
  console.log('example started');
  const result = await greet(name);
  console.log(result);
  return result;
}
// @@@SNIPEND
