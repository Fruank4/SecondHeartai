import { Heart, Mail, MapPin, Phone, Twitter, Instagram, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    product: {
      title: '产品',
      links: [
        { name: '功能介绍', href: '#features' },
        { name: '定价方案', href: '#pricing' },
        { name: '更新日志', href: '#' },
        { name: '路线图', href: '#' },
      ],
    },
    company: {
      title: '公司',
      links: [
        { name: '关于我们', href: '#about' },
        { name: '加入我们', href: '#' },
        { name: '新闻动态', href: '#' },
        { name: '合作伙伴', href: '#' },
      ],
    },
    support: {
      title: '支持',
      links: [
        { name: '帮助中心', href: '#faq' },
        { name: '联系我们', href: '#' },
        { name: '隐私政策', href: '#' },
        { name: '服务条款', href: '#' },
      ],
    },
    resources: {
      title: '资源',
      links: [
        { name: '博客', href: '#' },
        { name: '社区', href: '#' },
        { name: '开发者API', href: '#' },
        { name: '品牌资源', href: '#' },
      ],
    },
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'Github' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative w-full pt-20 pb-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-midnight-dark" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative z-10 w-full section-padding">
        <div className="max-w-[1800px] mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mb-16">
            {/* Brand column */}
            <div className="col-span-2">
              {/* Logo */}
              <a href="#hero" className="flex items-center gap-2 mb-6">
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <Heart className="w-8 h-8 text-coral fill-coral/20" />
                  <Heart className="absolute w-4 h-4 text-sky fill-sky/40 -bottom-1 -right-1" />
                </div>
                <span className="text-xl font-display font-bold text-white">
                  Second<span className="text-coral">Heart</span>
                </span>
              </a>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
                你的AI伙伴，倾听、理解并陪伴你度过人生的起起落落。
                让科技成为心灵的港湾。
              </p>

              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/50 text-sm">
                  <Mail className="w-4 h-4" />
                  <span>hello@secondheart.ai</span>
                </div>
                <div className="flex items-center gap-3 text-white/50 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>+86 400-888-8888</span>
                </div>
                <div className="flex items-center gap-3 text-white/50 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>北京市朝阳区</span>
                </div>
              </div>
            </div>

            {/* Links columns */}
            {Object.values(footerLinks).map((section, index) => (
              <div key={index}>
                <h4 className="text-white font-display font-semibold mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-white/50 text-sm hover:text-white transition-colors duration-300 relative group"
                      >
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-coral group-hover:w-full transition-all duration-300" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Social links & Newsletter */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-8 border-t border-white/10">
            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-coral/20 hover:border-coral/30 transition-all duration-300 group"
                >
                  <social.icon className="w-5 h-5 text-white/50 group-hover:text-coral transition-colors" />
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <div className="flex items-center gap-3">
              <input
                type="email"
                placeholder="订阅我们的新闻"
                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-coral/50 transition-colors w-64"
              />
              <button className="px-6 py-3 bg-coral text-white font-semibold rounded-xl hover:bg-coral-dark transition-colors">
                订阅
              </button>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
            <p className="text-white/30 text-sm">
              © 2024 SecondHeart. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/30 text-sm hover:text-white/50 transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-white/30 text-sm hover:text-white/50 transition-colors">
                服务条款
              </a>
              <a href="#" className="text-white/30 text-sm hover:text-white/50 transition-colors">
                Cookie设置
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
