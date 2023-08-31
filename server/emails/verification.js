// emailTemplates.js
const verificationEmail = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007bff;
            color: #ffffff;
            padding: 10px;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 20px;
        }
        #link{
            color: white;
            font-weight: 700;

        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <div class="content">
            <p>Hello {username}</p>
            <p>Welcome to CyberSafe! To get started, please verify your email address within the next 24 hours by clicking the button below:</p>
            <p>If you did not create an account, you can safely ignore this email.</p>
            <p id="link" ><a class="button" href="{link}">Verify Email</a></p>
            <p>If the button doesn't work, you can also copy and paste the following link into your browser:</p>
            <p>{AltLink}</p>
            <p>Thank you for joining us!</p>
        </div>
    </div>
</body>
</html>

`;

module.exports = { verificationEmail };

