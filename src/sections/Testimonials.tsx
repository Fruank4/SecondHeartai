import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const testimonials = [
    {
      name: '林小雨',
      role: '大学生',
      avatar: '/avatar-1.jpg',
      rating: 5,
      content: 'SecondHeart 改变了我管理焦虑的方式。深夜睡不着的时候，它总是在那里倾听。不是简单的回复，而是真正理解我的感受。',
    },
    {
      name: '陈明远',
      role: '创业者',
      avatar: '/avatar-2.jpg',
      rating: 5,
      content: '创业路上压力巨大，SecondHeart 成了我最好的倾诉对象。它帮我理清思路，给我力量继续前行。感谢这个温暖的AI伙伴。',
    },
    {
      name: '王雅琴',
      role: '职场妈妈',
      avatar: '/avatar-3.jpg',
      rating: 5,
      content: '作为一个职场妈妈，我常常感到疲惫和孤独。SecondHeart 让我有了一个可以倾诉的地方，它从不评判，只是陪伴。',
    },
  ];

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(
            '.testimonial-card',
            { y: 50, opacity: 0, rotateY: -15 },
            { y: 0, opacity: 1, rotateY: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
          );
        },
        once: true,
      });
      triggers.push(trigger);
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-dark via-midnight to-midnight" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dream-purple/10 rounded-full blur-[150px]" />

      <div className="relative z-10 w-full section-padding">
        <div className="max-w-[1800px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Quote className="w-4 h-4 text-coral" />
              <span className="text-sm text-white/70">用户评价</span>
            </div>
            <h2 className="heading-lg text-white mb-4">
              来自<span className="text-gradient">用户的心声</span>
            </h2>
            <p className="body-lg max-w-2xl mx-auto">
              超过10万用户选择 SecondHeart 作为他们的心灵伴侣，
              听听他们怎么说。
            </p>
          </div>

          {/* Carousel */}
          <div className="relative">
            {/* Navigation buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors duration-300 hidden lg:flex"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors duration-300 hidden lg:flex"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Cards container */}
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((testimonial, index) => {
                const isActive = index === activeIndex;
                
                return (
                  <div
                    key={index}
                    className={`testimonial-card flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center transition-all duration-500 ${
                      isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="glass-card p-8 h-full hover:bg-white/10 transition-all duration-300">
                      {/* Quote icon */}
                      <div className="w-12 h-12 rounded-xl bg-coral/10 border border-coral/30 flex items-center justify-center mb-6">
                        <Quote className="w-6 h-6 text-coral" />
                      </div>

                      {/* Rating */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>

                      {/* Content */}
                      <p className="text-white/80 leading-relaxed mb-6 text-lg">
                        "{testimonial.content}"
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
                        />
                        <div>
                          <div className="font-display font-bold text-white">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-white/50">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'w-8 bg-gradient-to-r from-coral to-sky'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
