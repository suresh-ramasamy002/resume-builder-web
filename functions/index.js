const functions = require('firebase-functions');
const admin = require('firebase-admin');
// const stripe = require('stripe')('sk_test_51HaFOGAqOUzmy33nQjGc2SvPVmPfhSKfvxGQrAIN3AMzlecKxJR6cSRyXeW0EaUojZzcTusbRQhWm8iN2ISUmNpe00YAuZeyob');
   const stripe = require('stripe')('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');
admin.initializeApp(functions.config().firebase);
exports.stripeChargeCall =  functions.https.onCall(async (data, context) => {
  try {
    if(!data || data.charge) return;
    const doc =  admin.firestore().collection('sources').doc();
    doc.set(data);
    const source = data.id;
    const email = data.email;
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
  } catch(error) {
    return {result: 'Payment Failed'}
  }
  });


















//   functions.database.ref('/payments/{userId}/{paymentId}').onWrite(event => {
//   const payment = event.data.val();
//   const userId = event.params.userId;
//   const paymentId = event.params.paymentId;
//
//
//   if(!payment || payment.charge) return;
//
//
//   return admin.database().ref(`/users/${userId}`).once('value').then(snapshot => {
//      return snapshot.val();
//   }).then(customer => {
//     const amount = payment.amount;
//     const idempotencyKey = paymentId;
//     const source = payment.token.id;
//     const currency = 'inr';
//     const charge = {amount, currency, source};
//     return stripe.charge.create(charge, {idempotencyKey});
//   }).then(charge => {
//     admin.database().ref(`/payments/${userId}/${paymentId}/charge`)
//       .set(charge)
//   })
// });

















