"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const faqs = [
    {
        question: "How do I join the GunGens server?",
        answer: "To join our server, simply add the server address play.gungens.com to your Minecraft server list. Our server supports Minecraft versions 1.16.5 to 1.19.2."
    },
    {
        question: "Is GunGens free to play?",
        answer: "Yes, GunGens is completely free to play. We offer optional cosmetic upgrades and ranks that provide additional features without affecting gameplay balance."
    },
    {
        question: "What makes GunGens different from other servers?",
        answer: "GunGens features custom-developed gameplay mechanics, superior server performance, a balanced economy, and a dedicated staff team. We focus on providing a premium experience with regular updates and events."
    },
    {
        question: "Do you have anti-cheat protection?",
        answer: "Yes, we use advanced anti-cheat systems to ensure fair gameplay. Our custom-built detection tools and active moderation team work together to maintain an enjoyable experience for legitimate players."
    },
    {
        question: "How often do you update the server?",
        answer: "We release minor updates weekly and major content updates monthly. Our development team is constantly working on new features and improvements based on community feedback."
    },
    {
        question: "Can I apply to join the staff team?",
        answer: "Yes, we periodically open applications for moderator and helper positions. Keep an eye on our Discord announcements for staff recruitment phases."
    }
];

const FAQItem = ({ faq, index, isOpen, toggleOpen }: {
    faq: typeof faqs[0],
    index: number,
    isOpen: boolean,
    toggleOpen: () => void
}) => {
    return (
        <motion.div
            className="border-b border-gray-800 py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}

        >
            <button
                className="flex justify-between items-center w-full text-left focus:outline-none"
                onClick={toggleOpen}
            >
                <span className="text-lg font-light">{faq.question}</span>
                <svg
                    className={`w-5 h-5 gold-text transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <p className="pt-4 text-gray-400 font-thin">{faq.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

// Contact Form popup component
const ContactFormPopup = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const webhookUrl = "https://discord.com/api/webhooks/1348682197439352892/cUHzM7-BRI7SoJL5FCWvV7pft8_OpRfVOlIh19pw3hx6dOrqM_VPB7XTCzma9Do2xKgM";

        try {
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: `**New Contact Form Submission**`,
                    embeds: [{
                        title: "Contact Form Details",
                        color: 16766720, // Gold color in decimal
                        fields: [
                            {
                                name: "Name",
                                value: formData.name || "Not provided",
                                inline: true
                            },
                            {
                                name: "Email",
                                value: formData.email || "Not provided",
                                inline: true
                            },
                            {
                                name: "Message",
                                value: formData.message || "No message content",
                                inline: false
                            }
                        ],
                        footer: {
                            text: "Sent from GunGens website"
                        },
                        timestamp: new Date().toISOString()
                    }]
                }),
            });

            if (response.ok) {
                setSubmitStatus('success');
                // Reset form after successful submission
                setFormData({ name: '', email: '', message: '' });
                // Close modal after a delay
                setTimeout(() => {
                    onClose();
                    setSubmitStatus('idle');
                }, 3000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error sending webhook:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-50 px-4"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: "spring", bounce: 0.3 }}
                        id="faq"
                    >
                        <div className="relative max-w-md w-full">
                            {/* Gold glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 rounded-xl blur-md opacity-70"></div>

                            <motion.div
                                className="relative bg-dark-darker border border-gold/30 rounded-xl overflow-hidden"
                                initial={{ y: 20 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                {/* Close button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>

                                <div className="p-6 ">
                                    <motion.h3
                                        className="text-2xl font-thin text-center mb-6 cursor-pointer"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        Contact <span className="gold-text">Support</span>
                                    </motion.h3>

                                    {submitStatus === 'success' ? (
                                        <motion.div
                                            className="text-center py-8"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-500">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h4 className="text-xl font-light mb-2">Message Sent!</h4>
                                            <p className="text-gray-400 font-thin">
                                                Thank you for reaching out. We&#39;ll get back to you soon.
                                            </p>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                            <div className="space-y-4">
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <label className="block text-gray-300 font-thin text-sm mb-1">Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        className="w-full bg-dark border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-gold text-white"
                                                        required
                                                    />
                                                </motion.div>

                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.4 }}
                                                >
                                                    <label className="block text-gray-300 font-thin text-sm mb-1">Email</label>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        className="w-full bg-dark border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-gold text-white"
                                                        required
                                                    />
                                                </motion.div>

                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.5 }}
                                                >
                                                    <label className="block text-gray-300 font-thin text-sm mb-1">Message</label>
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleChange}
                                                        rows={4}
                                                        className="w-full bg-dark border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-gold text-white"
                                                        required
                                                    ></textarea>
                                                </motion.div>

                                                {submitStatus === 'error' && (
                                                    <motion.div
                                                        className="text-red-500 text-sm font-thin"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                    >
                                                        There was an error sending your message. Please try again.
                                                    </motion.div>
                                                )}

                                                <motion.div
                                                    className="flex justify-center pt-2"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.6 }}
                                                >
                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        className="shine button px-8 py-3 bg-gold text-dark-darker font-light rounded-lg transition-all"
                                                    >
                                                        {isSubmitting ? (
                                                            <span className="flex items-center">
                                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-dark-darker" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                                                </svg>
                                                                SENDING...
                                                            </span>
                                                        ) : 'SEND MESSAGE'}
                                                    </button>
                                                </motion.div>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="faq" className="py-20 bg-dark-darker">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-thin mb-4">
                        Frequently <span className="gold-text">Asked</span> Questions
                    </h2>
                    <p className="text-gray-400 font-thin">
                        Find answers to common questions about our server and gameplay.
                    </p>
                </motion.div>

                <motion.div
                    className="card rounded-lg p-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            index={index}
                            isOpen={openIndex === index}
                            toggleOpen={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </motion.div>

                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <p className="text-gray-400 font-thin mb-4">
                        Still have questions?
                    </p>
                    <motion.button
                        className="button px-6 py-3 bg-transparent border gold-border text-white font-light rounded tracking-wide shine cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsContactOpen(true)}
                    >
                        CONTACT SUPPORT
                    </motion.button>
                </motion.div>
            </div>

            {/* Contact Form Popup */}
            <ContactFormPopup
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
            />
        </section>
    );
};

export default FAQSection;