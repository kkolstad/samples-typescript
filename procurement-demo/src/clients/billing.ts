import { Client, Connection } from '@temporalio/client';
import { v4 } from 'uuid';
import { billingSubscription } from '../workflows';

async function run(): Promise<void> {
  const client = new Client({
    connection: await Connection.connect({address: "localhost:7233"})
  });

  const handle = await client.workflow.start(billingSubscription, {
    taskQueue: 'procurement-demo',
    workflowId: `billing-subscription-${v4()}`,
    args: [{customerId: 'cust-1234', amount: 12.34, intervalInSeconds: 1}],
  });
  console.log(`Workflow '${handle.workflowId}' started.`)
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
