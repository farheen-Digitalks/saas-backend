export const trialEmailTemplate = ({
  name,
  email,
  password,
  loginUrl,
  productName = "YourHRMS",
  trialDays = 7,
}) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Trial Access</title>
        <style>
          body {
            background-color: #f4f6f8;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
          }
          .header {
            background: #2563eb;
            color: #ffffff;
            padding: 20px;
            text-align: center;
          }
          .content {
            padding: 30px;
            color: #374151;
          }
          .credentials {
            background: #f9fafb;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
          }
          .credentials p {
            margin: 6px 0;
            font-size: 14px;
          }
          .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 12px 20px;
            background: #2563eb;
            color: #ffffff;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
          }
          .footer {
            text-align: center;
            padding: 15px;
            font-size: 12px;
            color: #6b7280;
          }
        </style>
      </head>
  
      <body>
        <div class="container">
          <div class="header">
            <h2>Your Trial Access Is Ready 🚀</h2>
          </div>
  
          <div class="content">
            <p>Hello <strong>${name}</strong>,</p>
  
            <p>
              Thank you for requesting a trial of <strong>${productName}</strong>.
              Your trial account has been successfully created.
            </p>
  
            <div class="credentials">
              <p><strong>Login URL:</strong> ${loginUrl}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Temporary Password:</strong> ${password}</p>
            </div>
  
            <p>
              🔒 Please change your password after your first login.
            </p>
  
            <p>
              ⏳ Trial Validity: <strong>${trialDays} days</strong>
            </p>
  
            <a href="${loginUrl}" class="btn">Login to Dashboard</a>
  
            <p style="margin-top: 20px;">
              If you need any help during your trial, feel free to reply to this email.
            </p>
  
            <p>
              Regards,<br />
              <strong>${productName} Team</strong>
            </p>
          </div>
  
          <div class="footer">
            © ${new Date().getFullYear()} ${productName}. All rights reserved.
          </div>
        </div>
      </body>
    </html>
    `;
};
