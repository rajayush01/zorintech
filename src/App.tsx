import { Routes, Route, Outlet } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import Loading from './components/ui/Loading';
import NotFound from './pages/NotFound';

const Home = lazy(() => import('./pages/Home'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Services = lazy(() => import('./pages/Services'));
const Work = lazy(() => import('./pages/Work'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

const Fallback = () => (
	<div className="flex items-center justify-center min-h-screen bg-white">
		<div className="scale-[2]">
			<Loading mode="suspense" size="md" />
		</div>
	</div>
);

function App() {
	const [isInitialLoading, setIsInitialLoading] = useState(true);

	if (isInitialLoading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-white gap-4">
				<div className="font-display text-2xl font-bold text-primary">
					Zorin<span className="text-accent">Tech</span>
				</div>
				<Loading
					mode="timed"
					size="md"
					duration={1500}
					onLoadingComplete={() => setIsInitialLoading(false)}
					showProgress={true}
				/>
			</div>
		);
	}

	return (
		<Suspense fallback={<Fallback />}>
			<Routes>
				<Route
					path="/"
					element={
						<MainLayout>
							<Outlet />
						</MainLayout>
					}
				>
					<Route index element={<Home />} />
					<Route path="gallery" element={<Gallery />} />
					<Route path="services" element={<Services />} />
					<Route path="work" element={<Work />} />
					<Route path="about" element={<About />} />
					<Route path="contact" element={<Contact />} />
				</Route>
				<Route
					path="/404"
					element={
						<MainLayout>
							<NotFound />
						</MainLayout>
					}
				/>
				<Route
					path="*"
					element={
						<MainLayout>
							<NotFound />
						</MainLayout>
					}
				/>
			</Routes>
		</Suspense>
	);
}

export default App;
