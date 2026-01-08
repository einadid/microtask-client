import { Helmet } from 'react-helmet-async';
import Hero from '../../components/Home/Hero';
import BestWorkers from '../../components/Home/BestWorkers';
import Testimonials from '../../components/Home/Testimonials';
import HowItWorks from '../../components/Home/HowItWorks';
import Features from '../../components/Home/Features';
import Stats from '../../components/Home/Stats';
import FAQ from '../../components/Home/FAQ';

const Home = () => {
    return (
        <>
            <Helmet>
                <title>MicroTask | Home - Complete Tasks & Earn Money</title>
            </Helmet>
            
            <Hero />
            <BestWorkers />
            <HowItWorks />
            <Features />
            <Stats />
            <Testimonials />
            <FAQ />
        </>
    );
};

export default Home;