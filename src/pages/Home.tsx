import HeroSection from '../components/home/HeroSection';
import MarqueeSection from '../components/home/MarqueeSection';
import ServicesSection from '../components/home/ServicesSection';
import WorkSection from '../components/home/WorkSection';
import ProcessSection from '../components/home/ProcessSection';
import WhyUsSection from '../components/home/WhyUsSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const Home = () => {
	return (
		<>
			<HeroSection />
			<MarqueeSection />
			<ServicesSection />
			<WorkSection />
			<ProcessSection />
			<WhyUsSection />
			<TestimonialsSection />
			<CTASection />
		</>
	);
};

export default Home;
