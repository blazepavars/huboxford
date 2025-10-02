import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Hub - Oxford Properties',
  description: 'The Hub for Opportunity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/gcy4fhs.css" />
      </head>
      <body>{children}</body>
    </html>
  )
}