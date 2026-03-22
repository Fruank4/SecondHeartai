import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, MessageSquare, Heart, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      // Progress line animation
      const progressTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        scrub: 1,
        onUpdate: (self) => {
          if (progressRef.current) {
            gsap.to(progressRef.current, {
              height: `${self.progress * 100}%`,
              duration: 0.1,
            });
          }
        },
      });
      triggers.push(progressTrigger);

      // Steps animation
      const steps = stepsRef.current?.querySelectorAll('.step-item');
      steps?.forEach((step, index) => {
        const stepTrigger = ScrollTrigger.create({
          trigger: step,
          start: 'top 70%',
          onEnter: () => {
            gsap.fromTo(
              step,
              { x: index % 2 === 0 ? -50 : 50, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
            );
            gsap.fromTo(
              step.querySelector('.step-number'),
              { scale: 0 },
              { scale: 1, duration: 0.5, ease: 'back.out(2)', delay: 0.2 }
            );
          },
          once: true,
        });
        triggers.push(stepTrigger);
      });
    }, sectionRef);

    return () => {
      triggers.forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  const steps = [
    {
      number: '01',
      icon: Download,
      title: '下载应用',
      description: '在 App Store 或 Google Play 搜索 SecondHeart，一键下载安装。支持 iOS 和 Android 双平台。',
      features: ['免费下载', '一键安装', '跨平台支持'],
      color: 'coral',
    },
    {
      number: '02',
      icon: MessageSquare,
      title: '开始对话',
      description: '创建你的专属档案，SecondHeart 会学习了解你。然后就可以开始你们的第一次对话了。',
      features: ['个性化设置', '智能学习', '即时互动'],
      color: 'sky',
    },
    {
      number: '03',
      icon: Heart,
      title: '感受支持',
      description: '无论何时何地，SecondHeart 都在你身边。分享快乐，分担忧愁，共同成长。',
      features: ['24/7陪伴', '情感支持', '成长记录'],
      color: 'dream-purple',
    },
  ];

  const colorClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    coral: {
      bg: 'bg-coral/20',
      text: 'text-coral',
      border: 'border-coral/30',
      glow: 'shadow-glow',
    },
    sky: {
      bg: 'bg-sky/20',
      text: 'text-sky',
      border: 'border-sky/30',
      glow: 'shadow-glow-sky',
    },
    'dream-purple': {
      bg: 'bg-dream-purple/20',
      text: 'text-dream-purple',
      border: 'border-dream-purple/30',
      glow: 'shadow-glow-purple',
    },
  };

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight to-midnight-dark" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-sky/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-coral/10 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full section-padding">
        <div className="max-w-[1800px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 lg:mb-24">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <CheckCircle2 className="w-4 h-4 text-coral" />
              <span className="text-sm text-white/70">简单三步</span>
            </div>
            <h2 className="heading-lg text-white mb-4">
              开启你的<span className="text-gradient">心灵之旅</span>
            </h2>
            <p className="body-lg max-w-2xl mx-auto">
              无需复杂的设置，只需简单三步，SecondHeart 就能成为你生活中不可或缺的一部分。
            </p>
          </div>

          {/* Steps Timeline */}
          <div ref={stepsRef} className="relative max-w-4xl mx-auto">
            {/* Central line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 lg:-translate-x-1/2">
              {/* Progress fill */}
              <div
                ref={progressRef}
                className="absolute top-0 left-0 w-full bg-gradient-to-b from-coral via-sky to-dream-purple"
                style={{ height: '0%' }}
              />
            </div>

            {/* Steps */}
            <div className="space-y-16 lg:space-y-24">
              {steps.map((step, index) => {
                const colors = colorClasses[step.color];
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`step-item relative flex items-start gap-8 lg:gap-16 ${
                      isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                    style={{ opacity: 0 }}
                  >
                    {/* Number bubble */}
                    <div className="step-number absolute left-8 lg:left-1/2 w-16 h-16 -translate-x-1/2 z-10">
                      <div className={`w-full h-full rounded-full ${colors.bg} border-2 ${colors.border} flex items-center justify-center ${colors.glow}`}>
                        <span className={`text-xl font-display font-bold ${colors.text}`}>
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Content card */}
                    <div className={`ml-24 lg:ml-0 lg:w-5/12 ${isLeft ? 'lg:pr-16' : 'lg:pl-16'}`}>
                      <div className="glass-card p-6 lg:p-8 hover:bg-white/10 transition-all duration-300 group">
                        {/* Icon */}
                        <div className={`w-14 h-14 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <step.icon className={`w-7 h-7 ${colors.text}`} />
                        </div>

                        {/* Title */}
                        <h3 className="text-2xl font-display font-bold text-white mb-3">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/60 leading-relaxed mb-6">
                          {step.description}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {step.features.map((feature, fIndex) => (
                            <span
                              key={fIndex}
                              className={`px-3 py-1 text-xs font-medium rounded-full ${colors.bg} ${colors.text} border ${colors.border}`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Empty space for alternating layout */}
                    <div className="hidden lg:block lg:w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
