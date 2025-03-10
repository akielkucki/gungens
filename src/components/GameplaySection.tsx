"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const GameplaySection = () => {
    const ref = useRef(null);
    const statsRef = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

    const stats = [
        { value: "99.9%", label: "Uptime" },
        { value: "10,000+", label: "Active Players" },
        { value: "24/7", label: "Support" },
        { value: "Weekly", label: "Updates" }
    ];

    return (
        <section id="gameplay" className="py-20 bg-dark-darker relative overflow-hidden">
            <div className="absolute inset-0 hero-pattern opacity-30"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    ref={ref}
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-thin mb-4">
                        Unmatched <span className="gold-text">Gameplay</span> Experience
                    </h2>
                    <p className="text-gray-400 font-thin max-w-2xl mx-auto">
                        Our server combines cutting-edge technology with innovative gameplay mechanics to create a seamless and engaging experience.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center mb-20 gap-12">
                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 to-gold/40 rounded-lg blur opacity-70"></div>
                            <div className="relative shine card rounded-lg overflow-hidden">
                                <div className="aspect-video bg-gradient-to-br from-dark to-dark-darker"></div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3 className="text-2xl font-light gold-text mb-4">Advanced Server Technology</h3>
                        <p className="text-gray-300 font-thin mb-6">
                            GunGens is powered by state-of-the-art hardware and custom-built software that ensures smooth gameplay even during peak hours.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Custom anti-lag systems that maintain 20 TPS at all times",
                                "Advanced anti-cheat technology for fair gameplay",
                                "Custom plugins designed exclusively for our server",
                                "Regular backups and robust security measures"
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                                >
                                    <span className="gold-text mr-2">→</span>
                                    <span className="text-gray-400 font-thin">{item}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    ref={statsRef}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 gold-gradient rounded-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="text-center"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="text-3xl md:text-4xl font-light gold-text mb-2">{stat.value}</div>
                            <div className="text-sm font-thin text-gray-300">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default GameplaySection;