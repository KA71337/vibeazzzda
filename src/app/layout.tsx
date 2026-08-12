import type {Metadata} from 'next';import {Inter} from 'next/font/google';import './globals.css';import {StoreProvider} from '@/components/store';import {Shell} from '@/components/shell';
const inter=Inter({subsets:['latin'],variable:'--font-inter'});
export const metadata:Metadata={title:'VIBE AZ — Keyfiyyətli məhsullar',description:'Seçilmiş idman və əyləncə məhsulları',icons:{icon:'/logo.jpeg',apple:'/logo.jpeg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="az"><body className={inter.variable}><StoreProvider><Shell>{children}</Shell></StoreProvider></body></html>}
