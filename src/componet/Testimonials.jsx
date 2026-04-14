import React from 'react';
import { motion } from 'framer-motion';
import { Quote, ArrowLeft, ArrowRight } from 'lucide-react';

// Swiper core এবং মডিউল ইম্পোর্ট
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sumaiya Akter",
      role: "Parent, Dhaka",
      text: "Found an excellent physics tutor for my HSC student within just 3 days. The verification system really gives confidence. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Rakib Hossain",
      role: "Tutor, Chittagong",
      text: "As a tutor I get quality students regularly. The platform is fair, payments are secure and support team is very responsive.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Farhan Ahmed",
      role: "Student, Class 10",
      text: "My English improved a lot in just two months. Madam teaches very nicely and always encourages me. Thank you TuitionHub!",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Liza Sheikh",
      role: "Tutor, Mirpur",
      text: "The best part about this platform is the transparency. I've been tutoring here for a year now and it's been a great journey.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&auto=format&fit=crop"
    }
  ];

  return (
    // bg-base-100 লাইট মোডে সাদা এবং ডার্ক মোডে ডার্ক ব্যাকগ্রাউন্ড নিশ্চিত করে
    <section className="py-4  text-base-content transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-2 max-w-7xl">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">
            What Our Users Say
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Transform Your Life Through <br className="hidden md:block" /> Online Education
          </h2>
          <p className="max-w-2xl mx-auto opacity-70 text-lg">
            Join our Network and we can work together to find you what fits you.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative group">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            loop={true}
            navigation={{
              nextEl: '.next-btn',
              prevEl: '.prev-btn',
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true 
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16 px-4"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                {/* bg-base-200 কার্ডগুলোকে ব্যাকগ্রাউন্ড থেকে আলাদা করতে সাহায্য করে */}
                <div className="h-full bg-base-200/50 backdrop-blur-sm p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-base-300 transition-all duration-500 flex flex-col justify-between min-h-[350px]">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="avatar">
                        <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={item.avatar} alt={item.name} className="object-cover" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-xl">{item.name}</h4>
                        <p className="text-xs font-semibold opacity-50 uppercase tracking-widest">{item.role}</p>
                      </div>
                    </div>

                    <p className="opacity-80 leading-relaxed text-[17px] mb-8 italic">
                      "{item.text}"
                    </p>
                  </div>

                  {/* Quote Icon - Primary color for branding */}
                  <div className="text-primary opacity-20 group-hover:opacity-40 transition-opacity">
                    <Quote size={48} fill="currentColor" strokeWidth={0} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-6 mt-4">
            <button className="prev-btn btn btn-circle btn-outline btn-primary hover:text-white transition-all shadow-md">
              <ArrowLeft size={20} />
            </button>
            <button className="next-btn btn btn-circle btn-outline btn-primary hover:text-white transition-all shadow-md">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Global CSS for Swiper Dots */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: currentColor !important;
          opacity: 0.2;
        }
        .swiper-pagination-bullet-active {
          background-color: #570df8 !important; /* DaisyUI Primary */
          width: 24px !important;
          border-radius: 12px !important;
          opacity: 1;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;