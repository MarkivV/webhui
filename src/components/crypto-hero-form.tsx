"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, DollarSign, Mail } from "lucide-react";
import { toast } from "sonner";

export default function CryptoHeroForm() {
	const [email, setEmail] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const pricingTiers = [
		{ impressions: "100k", price: 15, popular: false },
		{ impressions: "1M", price: 100, popular: true },
		{ impressions: "10M", price: 700, popular: false },
		{ impressions: "100M", price: 6000, popular: false },
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		const response = await fetch("/api/email", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email }),
		});
		setIsSubmitting(false);
		setEmail("");
		toast.success("Email sent successfully!");
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-6xl mx-auto">
				{/* Header */}
				<div className="flex justify-between items-center mb-12 text-white">
					<div className="flex items-center space-x-2">
						<Zap className="h-8 w-8 text-purple-400" />
						<h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
							Ads on Solana
						</h1>
					</div>
					<div className="flex items-center space-x-2 text-sm text-gray-300">
						<Mail className="h-4 w-4" />
						<span>Contact: contact@solads.biz</span>
					</div>
				</div>

				{/* Main Content */}
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					{/* Left Side - Hero Content */}
					<div className="space-y-8">
						<div className="space-y-4">
							<Badge
								variant="secondary"
								className="bg-purple-500/20 text-purple-300 border-purple-500/30"
							>
								<TrendingUp className="h-3 w-3 mr-1" />
								Revolutionary Ad Platform
							</Badge>

							<h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
								Pay users to see your{" "}
								<span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
									project!
								</span>
							</h2>

							<p className="text-xl text-gray-300 leading-relaxed">
								50x cheaper than Google, Instagram, and X ads.
								<br />
								Reach your audience on the Solana blockchain.
							</p>
						</div>

						{/* Pricing Cards */}
						<div className="grid grid-cols-2 gap-4">
							{pricingTiers.map((tier, index) => (
								<Card
									key={String(index)}
									className={`relative bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 ${tier.popular ? "ring-2 ring-purple-500/50" : ""}`}
								>
									{tier.popular && (
										<Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500">
											Most Popular
										</Badge>
									)}
									<CardHeader className="pb-2">
										<CardTitle className="text-white text-lg">
											{tier.impressions}
										</CardTitle>
										<p className="text-gray-400 text-sm">Impressions</p>
									</CardHeader>
									<CardContent>
										<div className="flex items-center space-x-1">
											<DollarSign className="h-5 w-5 text-green-400" />
											<span className="text-2xl font-bold text-white">
												{tier.price}
											</span>
											<span className="text-gray-400">USD</span>
										</div>
									</CardContent>
								</Card>
							))}
						</div>

						{/* Additional Info */}
						<div className="space-y-2 text-sm text-gray-400">
							<p>
								* One-off setup fee of 20 USDC to register SNS name for your
								project.
							</p>
							<p>** Payments in USDC or SOL.</p>
						</div>
					</div>

					{/* Right Side - Contact Form */}
					<div className="lg:pl-8">
						<Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
							<CardHeader>
								<CardTitle className="text-2xl text-white text-center">
									Hear back from us
								</CardTitle>
								<p className="text-gray-400 text-center">
									Get started with your Solana advertising campaign today
								</p>
							</CardHeader>
							<CardContent className="space-y-6">
								<form onSubmit={handleSubmit} className="space-y-4">
									<div className="space-y-2">
										<label
											htmlFor="email"
											className="text-sm font-medium text-gray-300"
										>
											Your email address
										</label>
										<Input
											id="email"
											type="email"
											placeholder="Enter your email address"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
											className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
										/>
									</div>

									<Button
										type="submit"
										disabled={isSubmitting}
										className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
									>
										{isSubmitting ? "Sending..." : "Send"}
									</Button>
								</form>

								{/* Features */}
								<div className="pt-6 border-t border-slate-700">
									<div className="grid grid-cols-1 gap-3">
										<div className="flex items-center space-x-3 text-sm text-gray-300">
											<div className="w-2 h-2 bg-green-400 rounded-full" />
											<span>Instant setup & deployment</span>
										</div>
										<div className="flex items-center space-x-3 text-sm text-gray-300">
											<div className="w-2 h-2 bg-blue-400 rounded-full" />
											<span>Pay-per-view model</span>
										</div>
										<div className="flex items-center space-x-3 text-sm text-gray-300">
											<div className="w-2 h-2 bg-purple-400 rounded-full" />
											<span>Solana blockchain powered</span>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
