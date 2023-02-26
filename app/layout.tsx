import './globals.css';
import Link from 'next/link';
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
          <Link href="/">
            <Image src="https://cdn-icons-png.flaticon.com/512/25/25694.png"
              width="30"
              height="30"
              alt="Home"
            />
            &nbsp;Sākums
          </Link>
          <button className='styles.add_recipe_button'>&#x2607; Pievienot recepti</button>
        </nav>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}