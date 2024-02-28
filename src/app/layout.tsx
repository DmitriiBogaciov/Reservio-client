'use client'

import type { Metadata} from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import NavBar from './components/NavBar'
import './globals.css'


// export const metadata: Metadata = {
//   title: 'BookApp',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
        />
      </head>
      <body>
        <UserProvider>
          <NavBar />
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
