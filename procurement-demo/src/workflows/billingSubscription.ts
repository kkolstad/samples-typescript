import { condition, defineSignal, proxyActivities, setHandler, sleep } from '@temporalio/workflow';
import type { createActivities } from '../activities';

export interface BillingSubscriptionOptions {
  customerId: string,
  amount: number,
  intervalInSeconds: number,
}

const { chargeCustomer } = proxyActivities<ReturnType<typeof createActivities>>({
  startToCloseTimeout: '5m',
});

export const cancelBillingSubscription = defineSignal('cancel');

export async function billingSubscription(input: BillingSubscriptionOptions): Promise<void> {  
  let isActive = true;

  setHandler(cancelBillingSubscription, () => {
    console.log(`received cancelBillingSubscription signal`)
    isActive = false
  });

  while (isActive) {    
    await chargeCustomer(input);
    console.log(`Waiting ${input.intervalInSeconds} seconds until next charge.`)
    await sleep(input.intervalInSeconds * 1000)
  }
}










// const keepGoing = async () => !(await condition(() => !isActive, input.intervalInSeconds * 1000))
// while (await keepGoing()) {
//   await chargeCustomer(input);
//   console.log(`Waiting ${input.intervalInSeconds} seconds until next charge.\n`)
// }
