import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'

const raleway = Raleway({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400'],
    variable: '--font-raleway',
})

export const metadata: Metadata = {
    title: 'GunGens | Premium Minecraft Server',
    description: 'Experience premium gameplay on the GunGens Minecraft server',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={`${raleway.variable} font-sans`}>{children}</body>
        </html>
    )
}