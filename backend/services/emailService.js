const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send an email when a logistics request is submitted.
 * @param {object} data
 */
async function sendRequestConfirmationEmail(data) {
  const msg = {
    to: data.email, // user submitting the request
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: '📦 Your Logistics Request Has Been Received',
    text: `Hi ${data.name},

Your logistics request has been successfully received. We'll keep you updated on the status.

Details:
- Pickup: ${data.pickup}
- Delivery: ${data.delivery}
- Type of Goods: ${data.goods}
- Date: ${data.date}

Thank you for using our service!
`,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Confirmation email sent to ${data.email}`);
  } catch (error) {
    console.error('❌ Failed to send confirmation email:', error.response?.body || error.message);
  }
}

/**
 * Send a notification to admins when a new request is created.
 * You can add multiple recipients via an array in `to`.
 */
async function notifyAdminsOfNewRequest(data) {
  const msg = {
    to: process.env.ADMIN_ALERT_EMAIL, // single email or list
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: '📬 New Logistics Request Submitted',
    text: `A new request has been submitted by ${data.name} (${data.email}).

Pickup: ${data.pickup}
Delivery: ${data.delivery}
Goods: ${data.goods}
Date: ${data.date}
Region: ${data.region || 'Unassigned'}
Contact: ${data.contact}

View in dashboard for more details.`,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Admin alert email sent to ${process.env.ADMIN_ALERT_EMAIL}`);
  } catch (error) {
    console.error('❌ Failed to send admin alert email:', error.response?.body || error.message);
  }
}

module.exports = {
  sendRequestConfirmationEmail,
  notifyAdminsOfNewRequest,
};
