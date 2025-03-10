"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface GlowingCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

const GlowingCard: React.FC<GlowingCardProps> = ({
                                                     children,
                                                     className = '',
                                                     glowColor = 'from-gold/20 to-gold/40',
                                                 }) => {
    return (
        <div className="relative">
            <div className={`absolute -inset-1 bg-gradient-to-r ${glowColor} rounded-lg blur opacity-50`}></div>
            <motion.div
                className={`relative shine card rounded-lg overflow-hidden ${className}`}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default GlowingCard;