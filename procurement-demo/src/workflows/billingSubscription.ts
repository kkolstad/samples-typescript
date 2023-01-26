import { Period } from '@js-joda/core';
import { proxyActivities, sleep } from '@temporalio/workflow';
// Only import the activity types
import type { createActivities } from '../activities';

export interface BillingSubscriptionOptions {
  customerId: string,
  amount: number,
  intervalInSeconds: number,
}

const { chargeCustomer } = proxyActivities<ReturnType<typeof createActivities>>({
  startToCloseTimeout: '5m',
});


export async function billingSubscription(input: BillingSubscriptionOptions): Promise<void> {  
  let isActive = true;

  while (isActive) {
    await chargeCustomer(input);
    console.log(`Waiting ${input.intervalInSeconds} seconds until next charge.`)
    await sleep(input.intervalInSeconds * 1000)
  }

  // // Dynamically define the timeout based on given input
  // const { processOrder } = proxyActivities<ReturnType<typeof createActivities>>({
  //   startToCloseTimeout: orderProcessingMS,
  // });

  // const processOrderPromise = processOrder().then(() => {
  //   isActive = false;
  // });

  // await Promise.race([processOrderPromise, sleep(sendDelayedEmailTimeoutMS)]);

  // if (isActive) {
  //   await sendNotificationEmail();

  //   await processOrderPromise;
  // }

  // return 'Order completed!';
}
