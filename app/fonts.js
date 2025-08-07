import { Lato, Open_Sans } from 'next/font/google';

export const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'], 
  style: ['normal', 'italic'], 
  variable: '--font-lato',
});

export const open_sans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'], 
  style: ['normal', 'italic'], 
  variable: '--font-open-sans',
});