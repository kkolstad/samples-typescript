/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export interface ChargeCustomerOptions {
  customerId: string,
  amount: number,
}

;
export const createActivities = () => ({
  async chargeCustomer(input: ChargeCustomerOptions): Promise<void> {
    // throwRandomException({ fail: 0, outOf: 10 });
    console.log(`Charged customer '${input.customerId}' ${input.amount}`)
  },
});


function throwRandomException(input: { fail: number, outOf: number }) {
  if(input.fail < 1) return;
  const random = Math.floor(Math.random() * (input.outOf)) + 1;
  const failed = input.fail >= random;
  // console.log({
  //   ...input,
  //   random,
  //   result: failed
  // })
  if(failed) throw new Error('A transient failure occurred, please try again')
}