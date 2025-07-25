const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendLogisticsEmail = async (data) => {
  try {
    await sgMail.send({
      to: 'admin@blauqtrading@gmil.com', // or your own email for testing
      from: 'your-verified-email@blauqtrading.vercel.app', // must be verified in SendGrid
      subject: `🚚 New Logistics Request from ${data.name}`,
      html: `
        <h3>New Request Details</h3>
        <ul>
          <li><strong>Name:</strong> ${data.name}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Pickup:</strong> ${data.pickup}</li>
          <li><strong>Delivery:</strong> ${data.delivery}</li>
          <li><strong>Goods:</strong> ${data.goods}</li>
          <li><strong>Date:</strong> ${data.date}</li>
        </ul>
      `,
    });
    console.log('📧 Email sent!');
  } catch (err) {
    console.error('❌ Email failed:', err);
  }
};
