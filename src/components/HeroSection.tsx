"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroSection = () => {
    // Countdown timer state
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // Email input state
    const [email, setEmail] = useState('');
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    // Set launch date - example: 1 year from now
    useEffect(() => {
        const launchDate = new Date();
        launchDate.setDate(launchDate.getDate() + 365);

        const timer = setInterval(() => {
            const now = new Date();
            const difference = launchDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Handle email submission
    const handleEmailSubmit = async () => {
        // Basic email validation
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        setSubmitStatus('submitting');

        const webhookUrl = "https://discord.com/api/webhooks/1348685449937424546/Z4YJQokX0pkNNFwwKrlYnwzszrfYpCDrTMgaaRbmUjiLbPlRX8bwe65MU6c3J7He0fBu";

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: `**New Email Signup**`,
                    embeds: [{
                        title: "Launch Notification Signup",
                        color: 16766720, // Gold color in decimal
                        fields: [
                            {
                                name: "Email",
                                value: email,
                                inline: true
                            },
                            {
                                name: "Timestamp",
                                value: new Date().toLocaleString(),
                                inline: true
                            }
                        ],
                        footer: {
                            text: "Sent from GunGens website"
                        }
                    }]
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                setEmail(''); // Clear the email field

                // Reset status after 3 seconds
                setTimeout(() => {
                    setSubmitStatus('idle');
                }, 3000);
            } else {
                setSubmitStatus('error');
                console.error('Error response from Discord webhook:', response.statusText);
            }
        } catch (error) {
            setSubmitStatus('error');
            console.error('Error sending to Discord webhook:', error);
        }
    };

    const CountdownItem = ({ value, label }: { value: number, label: string }) => (
        <div className="flex flex-col items-center mr-4 last:mr-0">
            <div className="relative">
                <div className="bg-dark-darker border border-gold/20 rounded-lg px-3 py-1 min-w-[50px] text-center">
                    <span className="text-xl md:text-2xl font-thin gold-text">{value.toString().padStart(2, '0')}</span>
                </div>
            </div>
            <span className="text-xs uppercase mt-1 text-gray-400 font-thin">{label}</span>
        </div>
    );
    const [socialHover, setSocialHover] = useState<boolean>(false);
    const listSocialName = (social: string): string[] | null => {
        if (socialHover) {
            switch (social.toLowerCase()) {
                case 'd':
                    return 'iscord'.split("")
            }

        }
        return null;
    }
    return (
        <section className="hero-pattern min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black opacity-50"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 py-32">
                <div className="flex flex-col lg:flex-row items-center">
                    <motion.div
                        className="w-full lg:w-1/2 mb-12 lg:mb-0"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin tracking-wider mb-4">
                            <span className="gold-text">GUN</span>GENS
                        </h1>
                        <p className="text-xl md:text-2xl font-thin tracking-wide mb-4 text-gray-300">
                            <span className="gold-text">COMING</span> SOON
                        </p>
                        <p className="text-gray-400 font-thin mb-8 max-w-lg">
                            Join thousands of players in a meticulously crafted world where strategy, skill, and community converge for an unparalleled gaming experience.
                        </p>

                        {/* Countdown Timer */}
                        <div className="flex mb-8">
                            <CountdownItem value={timeLeft.days} label="Days" />
                            <CountdownItem value={timeLeft.hours} label="Hours" />
                            <CountdownItem value={timeLeft.minutes} label="Min" />
                            <CountdownItem value={timeLeft.seconds} label="Sec" />
                        </div>

                        {/* Email form */}
                        <div className="max-w-md mb-8">
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email for updates"
                                    className="bg-dark-darker border border-gold/30 rounded-lg px-4 py-3 w-full focus:outline-none focus:border-gold text-gray-300"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={submitStatus === 'submitting' || submitStatus === 'success'}
                                />
                                <motion.button
                                    className={`button px-6 py-3 w-full md:w-[calc(100%-150px)] ${submitStatus === 'success' ? 'bg-green-500' : 'bg-gold'} text-dark-darker font-light rounded tracking-wide whitespace-nowrap`}
                                    whileHover={{ scale: submitStatus !== 'submitting' && submitStatus !== 'success' ? 1.05 : 1 }}
                                    whileTap={{ scale: submitStatus !== 'submitting' && submitStatus !== 'success' ? 0.95 : 1 }}
                                    onClick={handleEmailSubmit}
                                    disabled={submitStatus === 'submitting' || submitStatus === 'success'}
                                >
                                    {submitStatus === 'submitting' && (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-dark-darker" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                            </svg>
                                            SENDING
                                        </span>
                                    )}
                                    {submitStatus === 'success' && 'SENT!'}
                                    {submitStatus === 'error' && 'TRY AGAIN'}
                                    {submitStatus === 'idle' && 'NOTIFY ME'}
                                </motion.button>
                            </div>
                            {submitStatus === 'error' && (
                                <p className="text-red-500 text-sm mt-2">
                                    Something went wrong. Please try again later.
                                </p>
                            )}
                            {submitStatus === 'success' && (
                                <p className="text-green-500 text-sm mt-2">
                                    Thank you! We&#39;ll notify you when we launch.
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                            <motion.a
                                href="#faq"
                                className="button px-6 py-3 bg-transparent border gold-border text-white font-light rounded tracking-wide text-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                LEARN MORE
                            </motion.a>
                            <div className="flex space-x-3">
                                {[{icon: 'D', url: 'https://discord.gg/4tXw47GwPT'}].map((social, index) => (
                                    <motion.a
                                        key={index}
                                        href="#"
                                        className="w-10 h-10 rounded-full border gold-border flex items-center justify-center text-gray-300 hover:text-gold transition-colors"
                                        whileHover={{ y: -3, width: "150px" }}
                                        transition={{ duration: 0.5 }}
                                        onMouseOver={() => setSocialHover(true)}
                                        onMouseOut={() => setSocialHover(false)}
                                        onClick={() => {window.open(social.url, '_blank')}}
                                    >
                                        <span

                                        >{social.icon}{listSocialName(social.icon)?.map((val,index) => {
                                            return (
                                                <motion.span key={index} initial={{ opacity: 0  }} animate={{ opacity: 1 }} transition={{ duration: 0.55*index }}>
                                                    {val}
                                                </motion.span>
                                            )
                                        })}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="w-full lg:w-1/2 flex justify-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative w-full max-w-md">
                            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-gold/40 rounded-lg blur opacity-50"></div>
                            <div className="relative shine card rounded-lg overflow-hidden">
                                <div className="aspect-video bg-gradient-to-br from-dark to-dark-darker p-4 flex items-center justify-center">
                                    <Image
                                        src={"/a3.png"}
                                        alt={"Gungens server"}
                                        width={1920}
                                        height={1080}
                                        className="rounded h-[318px] w-[500px]"
                                    />
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 bg-dark border gold-border p-2 rounded-md">
                                <div className="text-sm font-thin">
                                    <span className="gold-text">LAUNCH</span> COUNTDOWN
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <div className="animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 gold-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;