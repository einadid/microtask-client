import Hero from '../../components/Home/Hero';
import BestWorkers from '../../components/Home/BestWorkers';
import Testimonials from '../../components/Home/Testimonials';
import HowItWorks from '../../components/Home/HowItWorks';
import Features from '../../components/Home/Features';
import Stats from '../../components/Home/Stats';
import FAQ from '../../components/Home/FAQ';

const Home = () => {
    // Update document title using useEffect instead of Helmet
    document.title = 'MicroTask | Home - Complete Tasks & Earn Money';

    return (
        <div>
            <Hero />
            <BestWorkers />
            <HowItWorks />
            <Features />
            <Stats />
            <Testimonials />
            <FAQ />
        </div>
    );
};

export default Home;