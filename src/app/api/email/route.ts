import { NextResponse } from "next/server";
import imaps from "imap-simple";

import nodemailer from "nodemailer";
export async function POST(request: Request) {
	const { email: to } = await request.json();

	const emailUser = process.env.EMAIL_USER;
	const emailPass = process.env.EMAIL_PASS;

	if (!emailUser || !emailPass) {
		console.error("EMAIL_USER, EMAIL_PASS not set in environment variables");
		return NextResponse.json(
			{ success: false, error: "Email configuration error" },
			{ status: 500 },
		);
	}

	const transporter = nodemailer.createTransport({
		host: "mail.privateemail.com",
		port: 465,
		secure: true,
		auth: {
			user: emailUser,
			pass: emailPass,
		},
	});

	const title = "Thank You for Choosing SolAds!";
	const description = `
  <p>Hello!</p>
  <p>Thank you for choosing <strong>SolAds</strong>.</p>
  <p>We appreciate your trust and will be in touch within 24 hours to discuss the next steps.</p>
  <p>If you have any urgent questions, please reach our support team:</p>
  <ul>
    <li>Email: <a href="mailto:support@solads.com">contact@solads.com</a></li>
  </ul>
  <p>Best regards,</p>
  <p><strong>The SolAds Team</strong></p>
`;

	try {
		await transporter.sendMail({
			from: emailUser,
			to,
			subject: title,
			html: description,
		});

		const config = {
			imap: {
				user: emailUser,
				password: emailPass,
				host: "mail.privateemail.com",
				port: 993,
				tls: true,
				authTimeout: 3000,
			},
		};

		const connection = await imaps.connect(config);
		await connection.openBox("Sent");

		const raw = `From: "${emailUser}" <${emailUser}>
To: "${to}" <${to}>
Subject: Title
Date: ${new Date().toUTCString()}
Content-Type: text/html; charset=utf-8
${description}
`;

		await connection.append(raw, { mailbox: "Sent", flags: ["Seen"] });

		await connection.end();

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Failed to send email:", error);

		return NextResponse.json(
			{
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 },
		);
	}
}
