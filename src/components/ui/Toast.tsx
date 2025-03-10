"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ToastProps {
    message: string;
    duration?: number;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
    actionLabel?: string;
    onActionClick?: () => void;
}

const Toast: React.FC<ToastProps> = ({
                                         message,
                                         duration = 0, // 0 means it stays until dismissed
                                         position = 'bottom-center',
                                         actionLabel,
                                         onActionClick,
                                     }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Small delay before showing the toast
        const showTimeout = setTimeout(() => {
            setVisible(true);
        }, 500);

        // Set up auto-dismiss if duration is provided
        let dismissTimeout: NodeJS.Timeout;
        if (duration > 0) {
            dismissTimeout = setTimeout(() => {
                setVisible(false);
            }, duration);
        }

        return () => {
            clearTimeout(showTimeout);
            if (duration > 0) clearTimeout(dismissTimeout);
        };
    }, [duration]);

    // Position styles
    const getPositionClasses = () => {
        switch (position) {
            case 'top-right':
                return 'top-4 right-4';
            case 'top-left':
                return 'top-4 left-4';
            case 'bottom-right':
                return 'bottom-4 right-4';
            case 'bottom-left':
                return 'bottom-4 left-4';
            case 'top-center':
                return 'top-4 left-1/2 -translate-x-1/2';
            case 'bottom-center':
                return 'bottom-4 left-1/2 -translate-x-1/2';
            default:
                return 'bottom-4 left-1/2 -translate-x-1/2';
        }
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className={`fixed z-50 w-full md:w-2xl xl:w-3xl ${getPositionClasses()}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}

                >
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/30 to-gold/20 rounded-lg blur-sm opacity-70"></div>
                        <div className="relative px-6 py-4 bg-dark-darker border border-gold/30 rounded-lg shadow-lg flex items-center">
                            <div className="mr-4">
                                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 gold-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-white font-light">{message}</p>
                            </div>
                            {actionLabel && (
                                <button
                                    onClick={onActionClick}
                                    className="ml-4 px-3 py-1 bg-gold text-dark-darker rounded text-sm font-medium hover:bg-gold/90 transition-colors cursor-pointer"
                                >
                                    {actionLabel}
                                </button>
                            )}
                            <button
                                onClick={() => setVisible(false)}
                                className="ml-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;