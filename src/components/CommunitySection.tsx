"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CommunitySection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const socialLinks = [
        { name: "Discord", icon: "🎮", members: "10+" },
        { name: "Twitter", icon: "🐦", followers: "NONE" },
        { name: "YouTube", icon: "▶️", subscribers: "NONE" },
        { name: "Twitch", icon: "📺", followers: "NONE" }
    ];

    return (
        <section id="community" className="py-20 bg-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-thin mb-4">
                        Join Our <span className="gold-text">Community</span>
                    </h2>
                    <p className="text-gray-400 font-thin max-w-2xl mx-auto">
                        Connect with thousands of players worldwide and become part of our growing community.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {socialLinks.map((social, index) => (
                        <motion.div
                            key={index}
                            className="card rounded-lg p-6 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className="text-3xl mb-4">{social.icon}</div>
                            <h3 className="text-xl font-light gold-text mb-2">{social.name}</h3>
                            <p className="text-gray-400 font-thin mb-4">
                                {social.members || social.followers || social.subscribers}
                            </p>
                            <button className="button px-4 py-2 w-full border gold-border rounded font-thin tracking-wider text-sm gold-text">
                                FOLLOW US
                            </button>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-20 card rounded-lg p-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-light gold-text mb-2">Weekly Events</h3>
                        <p className="text-gray-400 font-thin">
                            Participate in our regular community events for exclusive rewards and bragging rights.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { day: "SATURDAY", event: "Server Planning Phase", time: "ALL DAY" },
                            { day: "WEDNESDAY", event: "Map Construction", time: "ALL DAY" },
                            { day: "SUNDAY", event: "Plugin Setup and configuration", time: "ALL DAY" }
                        ].map((event, index) => (
                            <motion.div
                                key={index}
                                className="border border-gray-800 rounded-lg p-4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                            >
                                <div className="text-xs font-thin text-gray-500 mb-1">{event.day}</div>
                                <div className="text-lg font-light gold-text mb-1">{event.event}</div>
                                <div className="text-sm font-thin text-gray-400">{event.time}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CommunitySection;