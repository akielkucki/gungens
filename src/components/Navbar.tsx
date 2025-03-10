"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#features", label: "FEATURES" },
        { href: "#gameplay", label: "GAMEPLAY" },
        { href: "#community", label: "COMMUNITY" },
        { href: "#faq", label: "FAQ" },
    ];

    const smoothScroll = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
        event.preventDefault();
        const targetElement: HTMLElement | null = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 50, // Adjust offset if needed
                behavior: "smooth",
            });
        }
    };

    return (
        <motion.nav
            className={`fixed w-full z-50 transition-all duration-300 ${
                scrolled ? "bg-black bg-opacity-90 backdrop-blur-md" : "bg-transparent"
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/">
                            <span className="text-2xl font-thin tracking-wider gold-text">
                                GUN<span className="font-light text-white">GENS</span>
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                className="text-gray-300 hover:text-white font-thin text-sm tracking-wide"
                                onClick={(event) => smoothScroll(event, link.href)}
                            >
                                {link.label}
                            </a>
                        ))}
                        <motion.button
                            className="button px-4 py-2 rounded bg-black border gold-border text-sm font-thin tracking-wider gold-text hover:bg-gray-900"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            JOIN SERVER
                        </motion.button>
                    </div>
                    <div className="flex md:hidden items-center">
                        <button
                            className="text-gray-300"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d={
                                        isOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <motion.div
                    className="md:hidden bg-dark-darker bg-opacity-95 backdrop-blur-md"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link, index) => (
                            <a
                                key={index}
                                href={link.href}
                                onClick={(event) => {
                                    smoothScroll(event, link.href);
                                    setIsOpen(false);
                                }}
                                className="block px-3 py-2 text-gray-300 hover:text-white font-thin text-sm tracking-wide"
                            >
                                {link.label}
                            </a>
                        ))}
                        <button className="block w-full text-left px-3 py-2 gold-text font-thin text-sm tracking-wide">
                            JOIN SERVER
                        </button>
                    </div>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Navbar;
