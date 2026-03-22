import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'expo.out', delay: 0.2 }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out', delay: 0.6 }
      );

      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)', delay: 0.8 }
      );

      // Phone animation
      gsap.fromTo(
        phoneRef.current,
        { rotateX: 45, opacity: 0, y: 100 },
        { rotateX: 0, opacity: 1, y: 0, duration: 1.4, ease: 'elastic.out(1, 0.75)', delay: 0.4 }
      );

      // Floating animation for phone
      gsap.to(phoneRef.current, {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Mouse move handler for 3D tilt effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Apply 3D tilt to phone
  useEffect(() => {
    if (phoneRef.current) {
      gsap.to(phoneRef.current, {
        rotateY: mousePosition.x * 10,
        rotateX: -mousePosition.y * 10,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [mousePosition]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden pt-20"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/50 via-midnight/70 to-midnight" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-coral/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky/20 rounded-full blur-[100px] animate-pulse animation-delay-500" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dream-purple/10 rounded-full blur-[150px] animate-pulse animation-delay-1000" />

      {/* Content */}
      <div className="relative z-10 w-full section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-[1800px] mx-auto">
          {/* Left: Text Content */}
          <div className="flex flex-col gap-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full w-fit mx-auto lg:mx-0">
              <Sparkles className="w-4 h-4 text-coral" />
              <span className="text-sm text-white/70">AI驱动的情感陪伴</span>
            </div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="heading-xl text-white"
            >
              你的
              <span className="text-gradient"> 第二颗心</span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="body-lg max-w-xl mx-auto lg:mx-0"
            >
              SecondHeart 是你的AI伙伴，倾听、理解并陪伴你度过人生的起起落落。
              让科技成为心灵的港湾，让AI成为梦想的翅膀。
            </p>

            {/* CTA Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="btn-primary group flex items-center justify-center gap-2">
                开始对话
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="btn-secondary">
                了解更多
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 justify-center lg:justify-start pt-4">
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-coral">100K+</div>
                <div className="text-sm text-white/50">活跃用户</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-sky">24/7</div>
                <div className="text-sm text-white/50">全天候陪伴</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-dream-purple">98%</div>
                <div className="text-sm text-white/50">满意度</div>
              </div>
            </div>
          </div>

          {/* Right: Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end perspective-1000">
            <div
              ref={phoneRef}
              className="relative preserve-3d"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect behind phone */}
              <div className="absolute inset-0 bg-gradient-to-br from-coral/30 to-sky/30 rounded-[3rem] blur-[60px] scale-90" />
              
              {/* Phone image */}
              <img
                src="/phone-mockup.png"
                alt="SecondHeart App"
                className="relative w-[280px] sm:w-[320px] lg:w-[380px] h-auto drop-shadow-2xl"
              />

              {/* Floating elements */}
              <div className="absolute -top-8 -left-8 w-16 h-16 bg-coral/20 backdrop-blur-xl rounded-2xl border border-coral/30 flex items-center justify-center animate-float">
                <span className="text-2xl">💙</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-sky/20 backdrop-blur-xl rounded-2xl border border-sky/30 flex items-center justify-center animate-float animation-delay-300">
                <span className="text-xl">📚</span>
              </div>
              <div className="absolute top-1/2 -right-12 w-12 h-12 bg-dream-purple/20 backdrop-blur-xl rounded-2xl border border-dream-purple/30 flex items-center justify-center animate-float animation-delay-600">
                <span className="text-lg">✨</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-midnight to-transparent z-10" />
    </section>
  );
};

export default Hero;
