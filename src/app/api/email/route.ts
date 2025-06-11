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

	const title = "Your ads on Solana blockchain";
	const description = `
  <p>Hi, great to hear from you!</p>
  <p>Since you found us through our own ads, you’ve already seen how effective they are.</p>
  <p>We use on-chain data to target real users who are likely interested in your project.</p>
  <br>
  <p>Please share a few details about your project:</p>
  <ul>
    <li><strong>What is it all about?</strong></li>
    <li><strong>What kind of audience are you looking to reach?</strong></li>
    <li><strong>Any budget range we should keep in mind?</strong></li>
  </ul>
  <p>Looking forward to hearing from you!</p>
  <br>
  <p><strong>The SolAds Team</strong><br>
  <a href="https://solads.biz">solads.biz</a></p>
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
Subject: ${title}
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
