import type { Metadata } from 'next'
import Script from 'next/script'
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
      <body>
        {children}
        <Script
          src="https://consent.trustarc.com/notice?domain=omers-opgi-corporate.com&c=teconsent&js=nj&noticeType=bb&pcookie&gtm=1&text=true"
          strategy="afterInteractive"
        />
        <div id="consent_blackbar" />
        <div id="teconsent" />
      </body>
    </html>
  )
}