import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageCircle, LineChart, Shield, Zap, Clock, BrainCircuit } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Title animation
      const titleTrigger = ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.fromTo(
            titleRef.current?.querySelectorAll('.animate-item') || [],
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
          );
        },
        once: true,
      });
      triggers.push(titleTrigger);

      // Cards animation with path drawing effect
      const cardsTrigger = ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 75%',
        onEnter: () => {
          // Animate connection lines first
          gsap.fromTo(
            '.connection-line',
            { strokeDashoffset: 200 },
            { strokeDashoffset: 0, duration: 1, ease: 'power2.out' }
          );
          
          // Then animate cards
          gsap.fromTo(
            cardsRef.current?.querySelectorAll('.feature-card') || [],
            { scale: 0, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.6, 
              stagger: 0.1, 
              ease: 'elastic.out(1, 0.75)',
              delay: 0.3
            }
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
      icon: MessageCircle,
      title: '24/7 智能对话',
      description: '随时随地，SecondHeart都在倾听。无论是深夜的忧虑还是清晨的期待，我们都陪伴左右。',
      color: 'from-coral to-coral-light',
      shadowColor: 'shadow-glow',
    },
    {
      icon: BrainCircuit,
      title: '情感洞察',
      description: '通过先进的AI技术，深度理解你的情绪状态，提供个性化的情感支持与建议。',
      color: 'from-sky to-sky-light',
      shadowColor: 'shadow-glow-sky',
    },
    {
      icon: Shield,
      title: '安全私密空间',
      description: '端到端加密保护，你的每一次倾诉都只属于你。我们承诺绝不分享你的隐私。',
      color: 'from-dream-purple to-dream-pink',
      shadowColor: 'shadow-glow-purple',
    },
    {
      icon: LineChart,
      title: '情绪追踪',
      description: '可视化你的情绪变化趋势，帮助你更好地了解自己，发现生活中的美好。',
      color: 'from-green-400 to-emerald-500',
      shadowColor: 'shadow-green-500/30',
    },
    {
      icon: Zap,
      title: '即时回应',
      description: '无需等待，秒级响应。你的每一个想法都能得到及时的反馈与互动。',
      color: 'from-yellow-400 to-orange-500',
      shadowColor: 'shadow-yellow-500/30',
    },
    {
      icon: Clock,
      title: '成长记录',
      description: '记录你的心路历程，见证自己的成长与蜕变。每一步都值得被铭记。',
      color: 'from-pink-400 to-rose-500',
      shadowColor: 'shadow-pink-500/30',
    },
  ];

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight-light to-midnight" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-coral/5 rounded-full blur-[150px]" />

      <div className="relative z-10 w-full section-padding">
        <div className="max-w-[1800px] mx-auto">
          {/* Section Header */}
          <div ref={titleRef} className="text-center mb-16 lg:mb-20">
            <div className="animate-item inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Zap className="w-4 h-4 text-coral" />
              <span className="text-sm text-white/70">核心功能</span>
            </div>
            <h2 className="animate-item heading-lg text-white mb-4">
              你的<span className="text-gradient">情感健康工具包</span>
            </h2>
            <p className="animate-item body-lg max-w-2xl mx-auto">
              SecondHeart 整合了最先进的AI技术与心理学原理，
              为你打造全方位的情感支持系统。
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div ref={cardsRef} className="relative">
            {/* Connection lines SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
              style={{ zIndex: 0 }}
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#4A90E2" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#9B59B6" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                className="connection-line"
                d="M 200 150 Q 400 100 600 150 T 1000 150"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="200"
                strokeDashoffset="200"
              />
              <path
                className="connection-line"
                d="M 200 350 Q 400 400 600 350 T 1000 350"
                fill="none"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                strokeDasharray="200"
                strokeDashoffset="200"
              />
            </svg>

            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`feature-card glass-card p-8 transition-all duration-500 cursor-pointer ${
                    activeCard === index ? 'scale-105 bg-white/15' : ''
                  } ${activeCard !== null && activeCard !== index ? 'opacity-50 scale-95 blur-[2px]' : ''}`}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 ${feature.shadowColor} shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-display font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <div className={`mt-6 flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
                    activeCard === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}>
                    <span className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      了解更多
                    </span>
                    <svg className="w-4 h-4 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
