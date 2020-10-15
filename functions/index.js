const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')('sk_test_51HaFOGAqOUzmy33nQjGc2SvPVmPfhSKfvxGQrAIN3AMzlecKxJR6cSRyXeW0EaUojZzcTusbRQhWm8iN2ISUmNpe00YAuZeyob');
admin.initializeApp(functions.config().firebase);
exports.stripeChargeCall = functions.https.onCall(async (data, context) => {

  if(!data || data.charge) return;

 const doc =  admin.firestore().collection('sources').doc();
 doc.set(data);

 const source = data.id;
 const email = 'suresh.ramasamy1996@gmail.com';
 const customer = await stripe.customers.create({email, source});
 const idempotencyKey = doc.id;
 const amount = data.amount;
 const currency = 'inr';
 const charge = {amount, currency, source, customer: customer.id};
 const charge_1 = await (stripe.charges.create(charge, {idempotencyKey}));
 if(charge_1.paid === true) {
   admin.firestore().collection('charges').doc().set(charge_1);
   return {result: 'Payment Successful'}
 } else  {
   admin.firestore().collection('charges_error').doc().set(charge_1);
   return {result: 'Payment Failed'}
 };
});
