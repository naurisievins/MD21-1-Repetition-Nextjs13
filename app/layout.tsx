import './globals.css';
import Image from 'next/image';
import React from 'react';

export default function RootLayout({
  children
}: {
  children: React.ReactNode,
}) {

  return (
    <html>
      <body>
        <nav>
          <a href="/">
            <Image src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
              width="30"
              height="30"
              alt="Home"
            />
            &nbsp;Sākums
          </a>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}