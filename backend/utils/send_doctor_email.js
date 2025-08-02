import nodemailer from "nodemailer";

export const sendDoctorCredentials = async (email, name, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"HealthCare System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Account Credentials",
      html: `
        <h3>Hello Dr. ${name},</h3>
        <p>Your account has been created successfully.</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>Please log in and change your password after the first login.</p>
        <br/>
        <p>Best regards,</p>
        <p>Healthcare Team Admin</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Failed to send email:", err);
    throw new Error("Email sending failed");
  }
};
