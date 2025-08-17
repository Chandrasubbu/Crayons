# 🚨 URGENT: Contact Form Setup Required

## Current Issue
The contact form on your website is **NOT WORKING** and shows this error:
> "Sorry, there was an error sending your enquiry. Please try again or contact us directly."

## Why This Happens
The form uses EmailJS service to send emails, but the EmailJS credentials are not configured. The code currently has placeholder values that need to be replaced with your actual EmailJS account details.

## Quick Fix Steps

### 1. Create EmailJS Account (5 minutes)
- Go to [https://www.emailjs.com/](https://www.emailjs.com/)
- Sign up for a free account
- Verify your email

### 2. Get Your Credentials (5 minutes)
- **Public Key**: Go to Account → General in EmailJS dashboard
- **Service ID**: Add Gmail service in Email Services section
- **Template ID**: Create a new template in Email Templates section

### 3. Update Your Code (2 minutes)
Edit `script.js` file:

**Line 6:** Replace `YOUR_EMAILJS_PUBLIC_KEY` with your actual public key
```javascript
publicKey: "user_your_actual_key_here",
```

**Line 180:** Replace the placeholders with your actual IDs
```javascript
emailjs.send('service_your_id', 'template_your_id', templateParams)
```

### 4. Test the Form
- Open `contactus.html` in browser
- Fill out the form
- Submit and check if email arrives at `sekar.badri@gmail.com`

## Detailed Instructions
See `docs/EmailJS_Setup_Instructions.md` for complete step-by-step setup guide.

## Need Help?
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- The setup should take less than 15 minutes total

---
**Status**: ❌ Form currently broken - setup required
**Priority**: HIGH - affects customer inquiries