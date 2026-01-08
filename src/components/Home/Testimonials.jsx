import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Worker',
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            rating: 5,
            quote: 'MicroTask has changed my life! I can now earn money from home while taking care of my kids. The tasks are simple and payments are always on time.'
        },
        {
            id: 2,
            name: 'Michael Chen',
            role: 'Buyer',
            image: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 5,
            quote: 'As a business owner, I needed quick data entry work done. MicroTask provided me with quality workers who completed my tasks perfectly and on time.'
        },
        {
            id: 3,
            name: 'Emily Davis',
            role: 'Worker',
            image: 'https://randomuser.me/api/portraits/women/68.jpg',
            rating: 5,
            quote: 'I started as a student looking for extra income. Now I earn consistently every month. The platform is easy to use and support is always helpful.'
        },
        {
            id: 4,
            name: 'David Wilson',
            role: 'Buyer',
            image: 'https://randomuser.me/api/portraits/men/75.jpg',
            rating: 4,
            quote: 'Great platform for getting micro-tasks done quickly. The quality of work is impressive and the pricing is very reasonable.'
        },
        {
            id: 5,
            name: 'Jessica Brown',
            role: 'Worker',
            image: 'https://randomuser.me/api/portraits/women/89.jpg',
            rating: 5,
            quote: 'The withdrawal process is smooth and I love how I can choose from multiple payment methods. Highly recommend for anyone looking to earn online!'
        },
        {
            id: 6,
            name: 'Robert Martinez',
            role: 'Buyer',
            image: 'https://randomuser.me/api/portraits/men/52.jpg',
            rating: 5,
            quote: 'I have been using MicroTask for my business needs for over a year now. The workers are reliable and the platform is very user-friendly.'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-indigo-900 to-purple-900">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
                        Join thousands of satisfied workers and buyers on our platform
                    </p>
                </motion.div>

                {/* Testimonials Slider */}
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    className="pb-12"
                >
                    {testimonials.map((testimonial) => (
                        <SwiperSlide key={testimonial.id}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl p-8 h-full"
                            >
                                {/* Quote Icon */}
                                <FaQuoteLeft className="text-4xl text-indigo-200 mb-4" />

                                {/* Quote Text */}
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    "{testimonial.quote}"
                                </p>

                                {/* Rating */}
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar
                                            key={i}
                                            className={`${
                                                i < testimonial.rating
                                                    ? 'text-yellow-400'
                                                    : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>

                                {/* Author Info */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-14 h-14 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-bold text-gray-800">
                                            {testimonial.name}
                                        </h4>
                                        <span className="text-indigo-600 font-medium">
                                            {testimonial.role}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;