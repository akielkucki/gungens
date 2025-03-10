"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedTextProps {
    text: string;
    className?: string;
    color?: string;
    highlightWords?: string[];
    highlightColor?: string;
    once?: boolean;
    delay?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
                                                       text,
                                                       className = '',
                                                       color = 'text-white',
                                                       highlightWords = [],
                                                       highlightColor = 'gold-text',
                                                       once = true,
                                                       delay = 0,
                                                   }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once });

    // Split the text into words
    const words = text.split(' ');

    // Check if a word should be highlighted
    const shouldHighlight = (word: string) => {
        return highlightWords.includes(word.replace(/[.,!?;:]/g, ''));
    };

    return (
        <motion.p
            ref={ref}
            className={`${color} ${className}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    className={shouldHighlight(word) ? highlightColor : ''}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: delay + index * 0.03 }}
                    style={{ display: 'inline-block', marginRight: '0.25rem' }}
                >
                    {word}
                </motion.span>
            ))}
        </motion.p>
    );
};

export default AnimatedText;