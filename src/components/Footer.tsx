"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-dark pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="md:col-span-2">
                        <Link href="/">
                            <span className="text-3xl font-thin tracking-wider gold-text">GUN<span className="font-light text-white">GENS</span></span>
                        </Link>
                        <p className="text-gray-400 font-thin mt-4 max-w-md">
                            The premier Minecraft gaming experience with custom gameplay, active community, and regular updates.
                        </p>
                        <div className="flex space-x-4 mt-6">
                            {['Discord', 'Twitter', 'YouTube', 'Twitch'].map((social, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    className="text-gray-400 hover:text-gold text-lg"
                                    whileHover={{ y: -3 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {/* Placeholder for social icons */}
                                    <div className="w-8 h-8 border gold-border rounded-full flex items-center justify-center">
                                        {social.charAt(0)}
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-light gold-text mb-4">Links</h4>
                        <ul className="space-y-2">
                            {['Home', 'Features', 'Gameplay', 'Community', 'FAQ'].map((item, index) => (
                                <li key={index}>
                                    <Link href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white font-thin text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-light gold-text mb-4">Resources</h4>
                        <ul className="space-y-2">
                            {['Rules', 'Store', 'Support', 'Vote', 'Staff'].map((item, index) => (
                                <li key={index}>
                                    <Link href="#" className="text-gray-400 hover:text-white font-thin text-sm">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 font-thin text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} GunGens. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        {['Terms', 'Privacy', 'Cookies'].map((item, index) => (
                            <Link key={index} href="#" className="text-gray-500 hover:text-white font-thin text-sm">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;