"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

interface ServerStatusProps {
    className?: string;
    serverAddress?: string;
}

const ServerStatus: React.FC<ServerStatusProps> = ({
                                                       className = '',
                                                   }) => {
    const [isOnline, setIsOnline] = useState(true);
    const [playerCount, setPlayerCount] = useState(1024);

    // This is a mock implementation - in a real scenario, you'd fetch this data from your server API
    useEffect(() => {
        // Mock server status check
        const interval = setInterval(() => {
            // Simulate status fluctuations (would be replaced with actual API calls)
            setIsOnline(Math.random() > 0.1); // 90% chance server is online
            setPlayerCount(Math.floor(800 + Math.random() * 400)); // Random player count between 800-1200
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className={`card px-4 py-2 inline-flex items-center space-x-2 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <div className="text-sm font-thin">
        <span className="gold-text">
          <AnimatedCounter target={playerCount} duration={3000} />
        </span> Players Online
            </div>
        </motion.div>
    );
};

export default ServerStatus;