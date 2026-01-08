import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const Hero = () => {
    const slides = [
        {
            id: 1,
            title: 'Complete Tasks, Earn Rewards',
            subtitle: 'Join thousands of workers earning money by completing simple micro-tasks from anywhere in the world.',
            image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920',
            buttonText: 'Start Earning Now',
            buttonLink: '/register'
        },
        {
            id: 2,
            title: 'Get Your Tasks Done Fast',
            subtitle: 'Post your tasks and get them completed by our skilled workforce. Quality work, quick turnaround.',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920',
            buttonText: 'Post a Task',
            buttonLink: '/register'
        },
        {
            id: 3,
            title: 'Trusted by Thousands',
            subtitle: 'Our platform connects buyers and workers worldwide. Safe, secure, and reliable payments guaranteed.',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920',
            buttonText: 'Join Our Community',
            buttonLink: '/register'
        }
    ];

    return (
        <section className="relative">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                className="h-[600px] md:h-[700px]"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="relative h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

                            {/* Content */}
                            <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="max-w-2xl text-white"
                                >
                                    <motion.h1
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2, duration: 0.6 }}
                                        className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                                    >
                                        {slide.title}
                                    </motion.h1>
                                    
                                    <motion.p
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4, duration: 0.6 }}
                                        className="text-lg md:text-xl text-gray-200 mb-8"
                                    >
                                        {slide.subtitle}
                                    </motion.p>
                                    
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6, duration: 0.6 }}
                                        className="flex flex-wrap gap-4"
                                    >
                                        <Link
                                            to={slide.buttonLink}
                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-105"
                                        >
                                            {slide.buttonText}
                                        </Link>
                                        <Link
                                            to="/login"
                                            className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                                        >
                                            Learn More
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
                >
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1.5 h-3 bg-white rounded-full mt-2"
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;