import Footer from './Footer';
import { SearchProvider } from '@/lib/context/SearchContext';


import { ReactNode } from 'react';
import Navbar from './Navbar';

interface Props {
    children: ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <SearchProvider>
            <div className="flex flex-col min-h-screen bg-white">
                <Navbar />
                <main className="max-w-7xl mx-auto flex-grow px-4">{children}</main>
                <Footer />
            </div>
        </SearchProvider>
    );
}
