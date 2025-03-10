"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ShineButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: 'primary' | 'secondary' | 'outline';
}

const ShineButton: React.FC<ShineButtonProps> = ({
                                                     children,
                                                     className = '',
                                                     onClick,
                                                     type = 'primary',
                                                 }) => {
    // Base classes
    let baseClasses = 'relative overflow-hidden px-6 py-3 rounded font-light tracking-wide transition-all duration-300';

    // Add type-specific classes
    if (type === 'primary') {
        baseClasses += ' bg-gold text-dark-darker';
    } else if (type === 'secondary') {
        baseClasses += ' bg-dark text-white border gold-border';
    } else if (type === 'outline') {
        baseClasses += ' bg-transparent text-white border gold-border';
    }

    return (
        <motion.button
            className={`${baseClasses} ${className} shine`}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
};

export default ShineButton;