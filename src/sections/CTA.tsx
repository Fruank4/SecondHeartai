import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Heart, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(
            contentRef.current?.querySelectorAll('.animate-item') || [],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-dark to-midnight" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-coral/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky/20 rounded-full blur-[120px] animate-pulse animation-delay-500" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-dream-purple/10 rounded-full blur-[150px] animate-pulse animation-delay-1000" />
      </div>

      <div className="relative z-10 w-full section-padding">
        <div className="max-w-4xl mx-auto">
          <div
            ref={contentRef}
            className="relative glass-card-strong rounded-3xl p-8 lg:p-16 text-center overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-coral/20 rounded-full blur-[60px]" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-sky/20 rounded-full blur-[60px]" />
            </div>

            {/* Floating icons */}
            <div className="absolute top-8 left-8 w-12 h-12 bg-coral/10 rounded-xl border border-coral/30 flex items-center justify-center animate-float">
              <Heart className="w-6 h-6 text-coral" />
            </div>
            <div className="absolute bottom-8 right-8 w-12 h-12 bg-sky/10 rounded-xl border border-sky/30 flex items-center justify-center animate-float animation-delay-300">
              <Sparkles className="w-6 h-6 text-sky" />
            </div>

            <div className="relative z-10">
              {/* Badge */}
              <div className="animate-item inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
                <Heart className="w-4 h-4 text-coral" />
                <span className="text-sm text-white/70">开始你的旅程</span>
              </div>

              {/* Title */}
              <h2 className="animate-item heading-lg text-white mb-4">
                准备好拥有你的
                <br />
                <span className="text-gradient">第二颗心</span>了吗？
              </h2>

              {/* Description */}
              <p className="animate-item body-lg max-w-2xl mx-auto mb-8">
                超过10万用户已经在 SecondHeart 找到了心灵的港湾。
                现在，轮到你了。
              </p>

              {/* CTA Buttons */}
              <div className="animate-item flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-primary group flex items-center justify-center gap-2 text-lg py-4 px-8">
                  免费开始
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="btn-secondary text-lg py-4 px-8">
                  了解更多
                </button>
              </div>

              {/* Trust text */}
              <p className="animate-item mt-8 text-sm text-white/40">
                无需信用卡 · 7天无理由退款 · 随时取消
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
