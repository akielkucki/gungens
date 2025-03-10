"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
    target: number;
    duration?: number;
    className?: string;
    prefix?: string;
    suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
                                                             target,
                                                             duration = 2000,
                                                             className = '',
                                                             prefix = '',
                                                             suffix = '',
                                                         }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            let startTime: number;
            let animationFrameId: number;

            const startAnimation = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);

                // Simple easing function for a nicer animation
                const easing = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

                setCount(Math.floor(easing(percentage) * target));

                if (progress < duration) {
                    animationFrameId = requestAnimationFrame(startAnimation);
                } else {
                    setCount(target);
                }
            };

            animationFrameId = requestAnimationFrame(startAnimation);

            return () => {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                }
            };
        }
    }, [target, duration, isInView]);

    return (
        <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
    );
};

export default AnimatedCounter;