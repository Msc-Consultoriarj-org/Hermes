import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Sistema Hermes - Gestão Patrimonial',
  description: 'Sistema de Gestão Patrimonial do Detran-RJ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
