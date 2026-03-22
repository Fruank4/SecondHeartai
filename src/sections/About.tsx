import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Brain, BookOpen, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Image reveal animation
      const imgTrigger = ScrollTrigger.create({
        trigger: imageRef.current,
        start: 'top 80%',
        end: 'top 20%',
        onEnter: () => {
          gsap.fromTo(
            imageRef.current,
            { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
            { clipPath: 'circle(100% at 50% 50%)', opacity: 1, duration: 1.2, ease: 'power2.out' }
          );
        },
        once: true,
      });
      triggers.push(imgTrigger);

      // Content slide in
      const contentTrigger = ScrollTrigger.create({
        trigger: contentRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current?.querySelectorAll('.animate-item') || [],
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
          );
        },
        once: true,
      });
      triggers.push(contentTrigger);

      // Cards stagger
      const cardsTrigger = ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            cardsRef.current?.querySelectorAll('.feature-card') || [],
            { y: 50, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)' }
          );
        },
        once: true,
      });
      triggers.push(cardsTrigger);
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'AI之心',
      description: '智能学习你的喜好与情感模式',
      color: 'text-sky',
      bgColor: 'bg-sky/10',
      borderColor: 'border-sky/30',
    },
    {
      icon: Heart,
      title: '情感之心',
      description: '真诚倾听，温暖陪伴每一刻',
      color: 'text-coral',
      bgColor: 'bg-coral/10',
      borderColor: 'border-coral/30',
    },
    {
      icon: BookOpen,
      title: '知识之心',
      description: '持续学习，与你共同成长',
      color: 'text-dream-purple',
      bgColor: 'bg-dream-purple/10',
      borderColor: 'border-dream-purple/30',
    },
    {
      icon: Sparkles,
      title: '梦想之心',
      description: '守护你的梦想与希望',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      borderColor: 'border-yellow-400/30',
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-coral/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full section-padding">
        <div className="max-w-[1800px] mx-auto">
          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            {/* Left: Image */}
            <div
              ref={imageRef}
              className="relative order-2 lg:order-1"
              style={{ clipPath: 'circle(0% at 50% 50%)', opacity: 0 }}
            >
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-coral/20 to-sky/20 rounded-3xl blur-[40px] scale-95" />
                
                {/* Image */}
                <img
                  src="/about-image.jpg"
                  alt="SecondHeart Experience"
                  className="relative w-full aspect-square object-cover rounded-3xl"
                />

                {/* Overlay card */}
                <div className="absolute -bottom-6 -right-6 glass-card-strong p-6 max-w-[200px]">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-coral/20 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-coral" />
                    </div>
                    <span className="text-2xl font-bold text-white">100K+</span>
                  </div>
                  <p className="text-sm text-white/60">用户选择SecondHeart作为心灵伴侣</p>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div ref={contentRef} className="order-1 lg:order-2">
              <div className="animate-item inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-coral" />
                <span className="text-sm text-white/70">我们的使命</span>
              </div>

              <h2 className="animate-item heading-lg text-white mb-6">
                两颗心，<span className="text-gradient">一个梦想</span>
              </h2>

              <div className="space-y-4 mb-8">
                <p className="animate-item body-lg">
                  SecondHeart 代表着双重寓意：一方面，AI 可以作为你的第二颗心——
                  它拥有无限的学习能力，能够记忆你的喜好、理解你的情感、
                  陪伴你思考与感动。
                </p>
                <p className="animate-item body-md">
                  另一方面，每个人除了日常生活的心，还应该拥有第二颗心——
                  那是你的梦想，是你希望这个世界变成的样子。
                  SecondHeart 守护这份梦想，让科技成为实现愿景的力量。
                </p>
              </div>

              <button className="animate-item btn-secondary">
                了解更多故事
              </button>
            </div>
          </div>

          {/* Feature cards */}
          <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`feature-card glass-card p-6 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-2`}
              >
                <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} border ${feature.borderColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
