import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import CTASection from '../home/CTASection';

interface MainLayoutProps {
	children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow">{children}</main>
			<CTASection/>
			<Footer />
		</div>
	);
};

export default MainLayout;
