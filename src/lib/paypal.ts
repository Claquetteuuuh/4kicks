import checkoutNodeJssdk from '@paypal/checkout-server-sdk'
import { SandboxEnvironment } from '@paypal/checkout-server-sdk/lib/core/paypal_environment';

const configureEnvironment = function () {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET

  if(!clientId || !clientSecret){
    return;
  }

  return new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
//   return process.env.NODE_ENV === 'production'
//     ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
//     : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret)
}

const client = function () {
  return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment() as SandboxEnvironment);
}

export default client