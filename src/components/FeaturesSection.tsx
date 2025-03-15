"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
    {
        icon: "⚔️",
        title: "PVP Arenas",
        description: "Compete in state-of-the-art arenas with balanced gameplay and seasonal tournaments."
    },
    {
        icon: "🏰",
        title: "Custom Maps",
        description: "Explore unique, hand-crafted environments that provide strategic depth and visual splendor."
    },
    {
        icon: "💰",
        title: "Economy System",
        description: "Build your wealth through custom marketplaces, missions, and resource gathering in our player-driven economy."
    },
    {
        icon: "🛡️",
        title: "Clans",
        description: "Team up with your fellow players and conquer the lands!"
    },
    {
        icon: "🏝",
        title: "Levels",
        description: "Choose from specialized roles with unique abilities and progression paths."
    },
    {
        icon: "🎮",
        title: "Infinite Rewards",
        description: "Enjoy countless opportunities for rewards from our shop just for playing! Bonus points if you refer your friends too!"
    }
];

const FeatureCard = ({ feature, index }: { feature: typeof features[0], index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            className="card rounded-lg p-6 h-full"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-light gold-text mb-2">{feature.title}</h3>
            <p className="text-gray-400 font-thin">{feature.description}</p>
        </motion.div>
    );
};

const FeaturesSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="features" className="py-20 bg-dark">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    ref={ref}
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl md:text-4xl font-thin mb-4">
                        Server <span className="gold-text">Features</span>
                    </h2>
                    <p className="text-gray-400 font-thin max-w-2xl mx-auto">
                        Experience Minecraft like never before with our carefully designed server features that enhance gameplay while maintaining balance.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;