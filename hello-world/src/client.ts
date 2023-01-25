// @@@SNIPSTART typescript-hello-client
import { Connection, Client } from '@temporalio/client';
import { example } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  // Connect to the default Server location (localhost:7233)
  console.log(Date.now());
  const connection = await Connection.connect({
    address: "localhost:7233"
  });
  // In production, pass options to configure TLS and other settings:
  // {
  //   address: 'foo.bar.tmprl.cloud',
  //   tls: {}
  // }

  console.log(Date.now());
  const client = new Client({
    connection,
    // namespace: 'foo.bar', // connects to 'default' namespace if not specified
  });

  const handle = await client.workflow.start(example, {
    // type inference works! args: [name: string]
    args: ['Temporal'],
    taskQueue: 'hello-world',
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: 'workflow-' + nanoid(),
  });
  console.log("workflow id:", handle.workflowId);
  const result = await handle.result();
  console.log("result", result);

  console.log(Date.now());
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
// @@@SNIPEND
