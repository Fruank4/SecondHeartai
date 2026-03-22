import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Pricing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: cardsRef.current,
        start: 'top 75%',
        onEnter: () => {
          gsap.fromTo(
            '.pricing-card',
            { y: 80, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
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

  const plans = [
    {
      name: '基础版',
      icon: Sparkles,
      price: '免费',
      period: '永久',
      description: '适合初次体验的用户',
      features: [
        '每日10次对话',
        '基础情感分析',
        '情绪日记',
        '社区支持',
      ],
      cta: '免费开始',
      popular: false,
      gradient: 'from-white/5 to-white/10',
      borderColor: 'border-white/10',
    },
    {
      name: '专业版',
      icon: Zap,
      price: '¥29',
      period: '/月',
      description: '适合需要深度陪伴的用户',
      features: [
        '无限对话次数',
        '高级情感洞察',
        '个性化成长计划',
        '语音对话支持',
        '优先客服支持',
      ],
      cta: '立即升级',
      popular: true,
      gradient: 'from-coral/20 to-sky/20',
      borderColor: 'border-coral/30',
    },
    {
      name: '高级版',
      icon: Crown,
      price: '¥99',
      period: '/月',
      description: '适合追求极致体验的用户',
      features: [
        '专业版全部功能',
        'AI心理咨询师',
        '家庭账户共享',
        '定制化AI训练',
        '专属客服经理',
        '线下活动优先',
      ],
      cta: '联系我们',
      popular: false,
      gradient: 'from-dream-purple/20 to-dream-pink/20',
      borderColor: 'border-dream-purple/30',
    },
  ];

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight-light to-midnight" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-coral/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-sky/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full section-padding">
        <div className="max-w-[1800px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <Crown className="w-4 h-4 text-coral" />
              <span className="text-sm text-white/70">定价方案</span>
            </div>
            <h2 className="heading-lg text-white mb-4">
              选择适合你的<span className="text-gradient">陪伴计划</span>
            </h2>
            <p className="body-lg max-w-2xl mx-auto">
              无论你是想初次尝试，还是寻求深度陪伴，
              我们都有适合你的方案。
            </p>
          </div>

          {/* Pricing Cards */}
          <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`pricing-card relative transition-all duration-500 ${
                  hoveredCard === index ? 'scale-105 z-10' : ''
                } ${hoveredCard !== null && hoveredCard !== index ? 'scale-95 opacity-70' : ''}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="px-4 py-1 bg-gradient-to-r from-coral to-sky rounded-full text-sm font-semibold text-white shadow-glow">
                      最受欢迎
                    </div>
                  </div>
                )}

                <div
                  className={`relative h-full rounded-3xl overflow-hidden backdrop-blur-xl bg-gradient-to-b ${plan.gradient} border ${plan.borderColor} p-8`}
                >
                  {/* Glow effect on hover */}
                  <div
                    className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
                      hoveredCard === index ? 'opacity-100' : ''
                    }`}
                    style={{
                      background: plan.popular
                        ? 'radial-gradient(circle at 50% 0%, rgba(255,107,107,0.2), transparent 70%)'
                        : 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1), transparent 70%)',
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon & Name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl ${plan.popular ? 'bg-coral/20' : 'bg-white/10'} flex items-center justify-center`}>
                        <plan.icon className={`w-6 h-6 ${plan.popular ? 'text-coral' : 'text-white/70'}`} />
                      </div>
                      <h3 className="text-xl font-display font-bold text-white">
                        {plan.name}
                      </h3>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-4xl font-display font-black text-white">
                        {plan.price}
                      </span>
                      <span className="text-white/50">{plan.period}</span>
                    </div>

                    {/* Description */}
                    <p className="text-white/60 text-sm mb-6">
                      {plan.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full ${plan.popular ? 'bg-coral/20' : 'bg-white/10'} flex items-center justify-center flex-shrink-0`}>
                            <Check className={`w-3 h-3 ${plan.popular ? 'text-coral' : 'text-white/70'}`} />
                          </div>
                          <span className="text-white/80 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-coral to-coral-light text-white hover:shadow-glow hover:scale-[1.02]'
                          : 'bg-white/10 text-white hover:bg-white/20 hover:scale-[1.02]'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-16 text-center">
            <p className="text-white/40 text-sm mb-4">安全支付，随时取消</p>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Check className="w-4 h-4 text-green-400" />
                <span>7天无理由退款</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Check className="w-4 h-4 text-green-400" />
                <span>随时取消订阅</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Check className="w-4 h-4 text-green-400" />
                <span>安全加密支付</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
