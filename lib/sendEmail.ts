import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendBookingEmail(userEmail: string, data: any) {
  await resend.emails.send({
    from: "Music-Concert <onboarding@resend.dev>",
    to: userEmail,
    subject: "Booking Confirmed 🎉",
    html: `
      <h2>Your Ticket is Confirmed 🎉</h2>
      <p><b>Booking ID:</b> MB${data.bookingId.slice(0, 8)}</p>
      <p><b>Event:</b> ${data.title}</p>
      <p><b>Date:</b> ${data.eventDate}</p>
      <p><b>Seats:</b> ${data.seats}</p>
      <p><b>Amount:</b>${data.totalAmount}</p>
      <p>Thank you for booking!</p>
    `,
  });
}