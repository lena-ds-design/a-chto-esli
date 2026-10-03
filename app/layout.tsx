import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'А что, если… — идея начинается с тебя',description:'Ответь на 5 простых вопросов и получи 3 идеи цифрового сервиса под свою работу, бизнес или личную задачу.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ru"><body>{children}</body></html>}
