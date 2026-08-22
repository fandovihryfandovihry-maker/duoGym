import type {Metadata,Viewport} from 'next';import './globals.css';
export const metadata:Metadata={title:'DuoGym Dashboard',description:'Společný silový trénink pro dva – série, váhy, odpočinek a progres.',manifest:'/manifest.webmanifest',icons:{icon:'/icon.svg',apple:'/icon.svg'}};export const viewport:Viewport={themeColor:'#070a0c',width:'device-width',initialScale:1,viewportFit:'cover'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="cs"><body>{children}</body></html>}
