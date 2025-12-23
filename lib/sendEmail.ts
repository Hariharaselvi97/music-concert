// import nodemailer from "nodemailer";

// export async function sendBookingEmail({
//   to,
//   bookingId,
//   seats,
//   totalAmount,
// }: {
//   to: string;
//   bookingId: string;
//   seats: string[];
//   totalAmount: number;
// }) {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"Concert Booking" <${process.env.EMAIL_USER}>`,
//     to,
//     subject: "🎟️ Booking Confirmation",
//     html: `
//       <h2>Booking Successful 🎉</h2>
//       <p><b>Booking ID:</b> ${bookingId}</p>
//       <p><b>Seats:</b> ${seats.join(", ")}</p>
//       <p><b>Total Amount:</b> ₹${totalAmount}</p>
//       <p>Enjoy the concert 🎶</p>
//     `,
//   };
  
//   await transporter.sendMail(mailOptions);
// }