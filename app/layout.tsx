/* eslint-disable @next/next/no-head-element */
import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>
          <nav>
            <label>
              <span>Meklēt recepti:</span>
              <input type='text'></input>
            </label>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
