import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        onEnter: () => {
          gsap.fromTo(
            '.faq-item',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
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

  const faqs = [
    {
      question: 'SecondHeart 是免费的吗？',
      answer: 'SecondHeart 提供免费基础版，包含每日10次对话、基础情感分析和情绪日记等功能。如果你需要更多对话次数和高级功能，可以选择专业版或高级版订阅计划。',
    },
    {
      question: '我的对话内容安全吗？',
      answer: '绝对安全。我们采用端到端加密技术保护你的所有对话内容。你的隐私是我们的首要任务，我们承诺绝不向第三方分享你的个人信息和对话记录。',
    },
    {
      question: 'SecondHeart 可以替代心理咨询师吗？',
      answer: 'SecondHeart 是一个AI情感陪伴工具，可以提供情感支持和倾听，但不能替代专业的心理咨询或治疗。如果你遇到严重的心理健康问题，我们建议寻求专业医疗帮助。',
    },
    {
      question: '如何取消订阅？',
      answer: '你可以随时在应用内的"设置"-"订阅管理"中取消订阅。取消后，你仍可以使用付费功能直到当前订阅周期结束。我们提供7天无理由退款保障。',
    },
    {
      question: 'SecondHeart 支持哪些语言？',
      answer: '目前 SecondHeart 支持中文、英文、日文和韩文。我们正在努力添加更多语言支持，以满足全球用户的需求。',
    },
    {
      question: '如何联系客服支持？',
      answer: '你可以通过应用内的"帮助与反馈"功能联系我们，或发送邮件至 support@secondheart.ai。专业版和高级版用户享有优先客服支持。',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-24 lg:py-32 w-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight to-midnight-dark" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-sky/10 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6">
              <HelpCircle className="w-4 h-4 text-coral" />
              <span className="text-sm text-white/70">常见问题</span>
            </div>
            <h2 className="heading-lg text-white mb-4">
              还有<span className="text-gradient">疑问</span>？
            </h2>
            <p className="body-lg">
              这里有一些常见问题的解答，如果还有其他问题，欢迎联系我们。
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className="faq-item"
                  style={{ opacity: 0 }}
                >
                  <div
                    className={`glass-card overflow-hidden transition-all duration-300 ${
                      isOpen ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="text-lg font-display font-semibold text-white pr-8">
                        {faq.question}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'bg-coral/20 rotate-180'
                            : 'bg-white/10'
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-5 h-5 text-coral" />
                        ) : (
                          <Plus className="w-5 h-5 text-white/70" />
                        )}
                      </div>
                    </button>

                    {/* Answer */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isOpen ? 'max-h-96' : 'max-h-0'
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-white/60 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-white/50 mb-4">还有其他问题？</p>
            <button className="btn-secondary">
              联系客服
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
