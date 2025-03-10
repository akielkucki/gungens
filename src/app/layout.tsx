// File: app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400'],
    variable: '--font-raleway',
})

// SEO metadata
export const metadata: Metadata = {
    title: {
        default: 'GunGens | Premium Minecraft Server Coming Soon',
        template: '%s | GunGens Minecraft Server'
    },
    description: 'GunGens is a premium Minecraft server featuring custom gameplay, superior performance, and an active community. Join us for an unparalleled gaming experience.',
    keywords: ['minecraft server', 'minecraft gaming', 'premium minecraft', 'minecraft community', 'minecraft pvp', 'minecraft economy', 'custom minecraft', 'gungens'],
    authors: [{ name: 'GunGens Team' }],
    creator: 'GunGens Development',
    publisher: 'GunGens Network',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://gungens.com'), // Replace with your actual domain
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-video-preview': -1,
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://gungens.com/', // Replace with your actual domain
        title: 'GunGens | Premium Minecraft Server Coming Soon',
        description: 'GunGens is a premium Minecraft server featuring custom gameplay, superior performance, and an active community. Join us for an unparalleled gaming experience.',
        siteName: 'GunGens',
        images: [
            {
                url: '/og-image.jpg', // Create and add this image to your public folder
                width: 1200,
                height: 630,
                alt: 'GunGens Minecraft Server',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GunGens | Premium Minecraft Server Coming Soon',
        description: 'GunGens is a premium Minecraft server featuring custom gameplay, superior performance, and an active community. Join us for an unparalleled gaming experience.',
        images: ['/twitter-image.jpg'], // Create and add this image to your public folder
        creator: '@gungens', // Replace with your actual Twitter handle
        site: '@gungens', // Replace with your actual Twitter handle
    },
    verification: {
        // Add your verification codes when available
        google: 'google-site-verification-code',
        yandex: 'yandex-verification-code',
    },
    category: 'Gaming',
    classification: 'Minecraft Server',
}

// Viewport settings
export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
        { media: '(prefers-color-scheme: light)', color: '#FFD700' },
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <head>
            {/* Structured data for rich results */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "WebSite",
                        "name": "GunGens Minecraft Server",
                        "url": "https://gungens.com/",
                        "potentialAction": {
                            "@type": "SearchAction",
                            "target": {
                                "@type": "EntryPoint",
                                "urlTemplate": "https://gungens.com/search?q={search_term_string}"
                            },
                            "query-input": "required name=search_term_string"
                        }
                    })
                }}
            />
            {/* Prefetch DNS for external resource domains */}
            <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
            <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
            <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
            {/* Favicon and app icons */}
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </head>
        <body className={`${raleway.variable} font-sans`}>{children}</body>
        </html>
    )
}