import { useState, useEffect, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Heart, 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Stethoscope, 
  Menu, 
  X, 
  Sparkles,
  ArrowRight,
  Globe,
  Quote,
  ChevronDown,
  Phone,
  MessageSquare,
  BookOpen,
  Award,
  ShieldCheck,
  UserCheck
} from "lucide-react";

// --- Types & Navigation ---

type Page = 'home' | 'about-intro' | 'about-location' | 'doctor' | 'testimonials-stories' | 'testimonials-media' | 'schedule' | 'english';

interface MenuItem {
  name: string;
  path?: Page;
  children?: { name: string; path: Page }[];
  icon?: ReactNode;
}

const menuItems: MenuItem[] = [
  { name: "最新消息", path: 'home' },
  { 
    name: "關於我們", 
    children: [
      { name: "院所介紹", path: 'about-intro' },
      { name: "院所位置", path: 'about-location' }
    ]
  },
  { name: "醫師介紹", path: 'doctor' },
  { 
    name: "溫暖見證", 
    children: [
      { name: "實例分享", path: 'testimonials-stories' },
      { name: "媒體專訪", path: 'testimonials-media' }
    ]
  },
  { name: "門診時間", path: 'schedule' },
  { name: "English", path: 'english', icon: <Globe className="w-3 h-3 ml-1" /> },
];

// --- Components ---

const Navbar = ({ setPage, currentPage }: { setPage: (p: Page) => void, currentPage: Page }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? "bg-white/95 backdrop-blur-md py-4 shadow-xl border-b border-brand-accent/30" : "bg-transparent py-8"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Brand */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => { setPage('home'); setIsOpen(false); }}
          >
            <div className="relative">
              <div className="w-12 h-12 border border-brand-accent flex items-center justify-center rounded-sm rotate-45 group-hover:rotate-0 transition-all duration-700 bg-white shadow-lg">
                 <span className="text-primary-brown font-serif font-bold text-2xl -rotate-45 group-hover:rotate-0 transition-all duration-700">溫</span>
              </div>
              <div className="absolute -inset-1 border border-brand-accent/20 rounded-sm rotate-12 -z-10 group-hover:rotate-0 transition-all"></div>
            </div>
            <div className="flex flex-col border-l border-brand-accent/30 pl-4 ml-6">
              <span className="text-xl md:text-2xl font-serif font-bold tracking-[0.15em] text-primary-brown">
                溫崇凱中醫診所
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-brand-accent font-bold mt-0.5">
                Modern Acupuncture & Traditional Medicine
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {menuItems.map((item) => (
              <div 
                key={item.name} 
                className="relative group h-full"
                onMouseEnter={() => setHoveredMenu(item.name)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <button 
                  onClick={() => !item.children && setPage(item.path!)}
                  className={`text-[11px] tracking-[0.15em] font-serif font-medium transition-all py-2 flex items-center space-x-1 uppercase group ${
                    (item.path === currentPage || item.children?.some(c => c.path === currentPage)) 
                    ? "text-brand-accent" 
                    : "text-gray-600 hover:text-brand-accent"
                  }`}
                >
                  <span className="relative">
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent transition-all duration-300 group-hover:w-full ${(item.path === currentPage || item.children?.some(c => c.path === currentPage)) ? "w-full" : ""}`}></span>
                  </span>
                  {item.icon}
                  {item.children && <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-300 ${hoveredMenu === item.name ? 'rotate-180' : ''}`} />}
                </button>

                {/* Enhanced Luxury Dropdown */}
                <AnimatePresence>
                  {item.children && hoveredMenu === item.name && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-3 w-56 bg-white shadow-2xl border border-brand-accent/20 p-2 rounded-sm z-[60]"
                    >
                      <div className="absolute -top-2 right-10 w-4 h-4 bg-white border-t border-l border-brand-accent/20 rotate-45"></div>
                      <div className="relative bg-warm-cream/30 p-2 border border-brand-accent/10">
                        {item.children.map((child) => (
                          <button
                            key={child.name}
                            onClick={() => { setPage(child.path); setHoveredMenu(null); }}
                            className={`w-full text-left px-6 py-4 text-[11px] tracking-widest font-serif font-medium transition-all uppercase mb-1 last:mb-0 ${
                              currentPage === child.path 
                              ? "bg-brand-accent text-white" 
                              : "text-gray-600 hover:bg-white hover:text-brand-accent"
                            }`}
                          >
                            {child.name}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-primary-brown p-2 border border-brand-accent/20"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              className="fixed inset-0 z-[100] bg-white lg:hidden flex flex-col h-screen"
            >
              <div className="flex justify-between items-center p-6 border-b border-brand-accent/10">
                <span className="font-serif font-bold text-xl text-primary-brown">目錄</span>
                <button onClick={() => setIsOpen(false)} className="p-2 border border-brand-accent/20"><X className="w-6 h-6" /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-10 space-y-10 bg-warm-cream/20">
                {menuItems.map((item) => (
                  <div key={item.name} className="space-y-6">
                    <button 
                      onClick={() => !item.children && (setPage(item.path!), setIsOpen(false))}
                      className="text-3xl font-serif font-bold text-primary-brown flex items-center justify-between w-full uppercase tracking-tighter"
                    >
                      {item.name}
                      {!item.children && <ArrowRight className="w-6 h-6 text-brand-accent" />}
                    </button>
                    {item.children && (
                      <div className="pl-6 border-l-[3px] border-brand-accent/20 flex flex-col space-y-6">
                        {item.children.map(child => (
                          <button 
                            key={child.name}
                            onClick={() => { setPage(child.path); setIsOpen(false); }}
                            className="text-xl font-serif text-gray-400 text-left hover:text-brand-accent transition-colors"
                          >
                            {child.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

// --- Page Components ---

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-0">
      {/* Hero Section - Beige Tone & Dark Brown Text */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#F5F1E9]">
        {/* Background Image - Beige Aesthetic */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover opacity-60 grayscale-[0.3]"
            alt="Beige TCM Aesthetic"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-warm-cream/20"></div>
        </div>
        
        <div className="relative z-10 w-full text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-brand-accent font-serif tracking-[0.5em] uppercase text-xs font-bold">Modern Acupuncture Clinic</span>
              <div className="w-12 h-[1px] bg-brand-accent/50"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-primary-brown tracking-[0.3em] font-medium">
              溫氏現代針灸
            </h1>
            
            <p className="text-xl md:text-2xl font-serif text-primary-brown/80 tracking-[0.2em] font-light italic">
              全台唯一創始人 溫崇凱 中醫師
            </p>

            <div className="pt-10">
              <button 
                onClick={() => setPage('schedule')}
                className="px-14 py-5 bg-primary-brown text-white hover:bg-brand-accent transition-all duration-500 font-serif text-xs uppercase font-bold tracking-[0.4em] shadow-2xl"
              >
                立即預約
              </button>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4 opacity-40 text-white"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Discovery</span>
          <div className="w-[1px] h-10 bg-white/30"></div>
        </motion.div>
      </section>

      {/* Intro Section - Clean Typography */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.6em] text-brand-accent font-bold">About Our Philosophy</h2>
            <div className="w-12 h-px bg-brand-accent/20 mx-auto"></div>
          </div>
          
          <div className="space-y-10">
            <h3 className="text-3xl md:text-4xl font-serif text-primary-brown leading-relaxed tracking-tight">
              從胚胎學探索針灸的奧秘<br />
              <span className="text-2xl font-light italic opacity-70">重新定義現代醫療的可能性</span>
            </h3>
            
            <p className="text-gray-500 font-serif text-lg leading-loose italic max-w-2xl mx-auto opacity-90">
              溫氏現代針灸學：融合諾貝爾獎啟發的科學精神，深入研究胚胎學和神經生理學，用現代醫學原理解構傳統針灸。我們發現身體的每一處微小的反射區域，都隱藏著通往全身健康的密碼。
            </p>
          </div>

          <div className="pt-10">
            <button 
              onClick={() => setPage('about-intro')}
              className="text-xs uppercase font-bold tracking-[0.4em] text-primary-brown border-b-2 border-brand-accent pt-6 pb-2 hover:text-brand-accent transition-all inline-block"
            >
              LEARN MORE
            </button>
          </div>
        </div>
      </section>

      {/* Service Items Section - Refactored to match screenshot */}
      <section className="py-32 bg-[#F8F8F8] relative overflow-hidden">
        {/* Decorative background element like in the screenshot */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-brand-accent/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-2">
            <h2 className="text-3xl md:text-4xl font-serif text-[#0A2647] tracking-[0.3em] font-bold">服務項目</h2>
            <div className="flex flex-col items-center">
              <div className="w-16 h-[2px] bg-brand-accent/40 mb-2"></div>
              <span className="text-gray-400 font-sans tracking-[0.2em] uppercase text-xs">Service</span>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-10 lg:gap-12">
            {[
              { 
                title: "現代針灸學", 
                desc: "融合解剖與胚胎原理，超越傳統經絡局限。", 
                icon: <Sparkles className="w-8 h-8" /> 
              },
              { 
                title: "自律神經調節", 
                desc: "科學引導身體修復，緩解失眠與壓力。", 
                icon: <Stethoscope className="w-6 h-6" /> 
              },
              { 
                title: "耳穴全息診斷", 
                desc: "啟動人體微修復系統，精準對應五臟交感。", 
                icon: <ShieldCheck className="w-8 h-8" /> 
              },
              { 
                title: "疑難雜症突破", 
                desc: "在神經系統與免疫科領域尋找康復曙光。", 
                icon: <Award className="w-8 h-8" /> 
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -15, scale: 1.05 }}
                className={`flex flex-col items-center py-12 px-10 bg-primary-brown text-white rounded-full w-32 md:w-40 lg:w-44 transition-all duration-700 shadow-2xl relative group ${i % 2 === 0 ? 'mt-8' : ''}`}
              >
                <div className="mb-10 opacity-90 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <div 
                  className="font-serif text-xl md:text-2xl font-medium tracking-[0.4em] flex flex-col items-center mb-6"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  {item.title}
                </div>
                {/* Desktop Hover Description */}
                <div className="absolute inset-x-0 bottom-12 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center">
                   <p className="text-[10px] leading-relaxed text-brand-accent font-serif italic font-light">
                      {item.desc}
                   </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section - Minimalist White */}
      <section className="py-40 bg-white">
        <div className="max-w-4xl mx-auto px-6 relative">
          <div className="absolute top-0 left-0 -mt-10 opacity-5">
            <Quote className="w-32 h-32 text-primary-brown" />
          </div>
          
          <div className="space-y-16 text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-serif text-primary-brown italic leading-tight">
              無私分享若春陽~溫暖見證燃希望
            </h2>
            
            <div className="space-y-8 text-gray-500 font-serif italic text-lg md:text-xl leading-[2] opacity-80 decoration-brand-accent/10 underline underline-offset-[12px] decoration-1">
              <p>
                許多來自各地的患者，凭藉您們的肺腑見證，鼓起勇氣不遠千里而來。您們無私的分享宛若春陽，帶給每位求助無門者信心與希望。
              </p>
            </div>

            <div className="pt-10 flex flex-col items-center">
              <div className="w-12 h-px bg-brand-accent/40 mb-6"></div>
              <button 
                onClick={() => setPage('testimonials-stories')}
                className="px-10 py-4 border border-primary-brown/10 text-primary-brown hover:bg-primary-brown hover:text-white transition-all duration-700 font-serif text-[10px] uppercase font-bold tracking-[0.4em]"
              >
                進入溫暖見證專區
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Preview Section - Replaced Doctor Section */}
      <section className="py-32 bg-warm-cream/10 border-y border-brand-accent/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
               <div className="lg:w-1/3 space-y-8 text-center lg:text-left pt-6">
                  <div className="space-y-4">
                    <span className="text-brand-accent font-serif tracking-[0.5em] uppercase text-xs font-bold font-sans">Office Hours</span>
                    <h2 className="text-4xl font-serif text-primary-brown tracking-tight">門診時間</h2>
                    <div className="w-16 h-px bg-brand-accent mx-auto lg:mx-0"></div>
                  </div>
                  <p className="text-gray-500 font-serif text-lg leading-relaxed italic opacity-80">
                    溫崇凱中醫診所提供精緻、個人化的現代針灸治療。為確保醫療品質，所有門診採特約預約制，敬請提前接洽。
                  </p>
                  <button 
                    onClick={() => setPage('schedule')}
                    className="flex lg:mx-0 mx-auto items-center space-x-6 text-primary-brown font-serif font-bold uppercase tracking-[0.3em] text-[10px] border border-primary-brown/20 px-8 py-4 hover:bg-primary-brown hover:text-white transition-all shadow-md group"
                  >
                    <span>詳細排班資訊</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
               </div>
               
                <div className="lg:w-3/4 w-full overflow-x-auto bg-white/40 backdrop-blur-sm p-4 md:p-8 border border-brand-accent/5 shadow-inner">
                   <table className="w-full border-collapse font-serif">
                     <thead>
                       <tr className="border-t border-b border-gray-200/60">
                         <th className="py-6 px-4"></th>
                         {["週一", "週二", "週三", "週四", "週五", "週六"].map(day => (
                           <th key={day} className="py-6 px-4 text-[#5E8E62] font-semibold text-lg tracking-widest">{day}</th>
                         ))}
                       </tr>
                     </thead>
                     <tbody className="text-center text-gray-500/80">
                       <tr className="border-b border-gray-100/40">
                          <td className="py-8 px-4 text-xl font-light">早</td>
                          {[1, 2, 3, 4, 5, 6].map(i => (
                            <td key={i} className="py-8 px-4">
                              <div className="w-2.5 h-2.5 bg-gray-400 rotate-45 mx-auto transition-transform hover:scale-125 duration-300 shadow-sm opacity-90"></div>
                            </td>
                          ))}
                       </tr>
                       <tr className="border-b border-gray-100/40">
                          <td className="py-8 px-4 text-xl font-light">中</td>
                          {[1, 2, 3, 4, 5].map(i => (
                            <td key={i} className="py-8 px-4">
                              <div className="w-2.5 h-2.5 bg-gray-600 rotate-45 mx-auto transition-transform hover:scale-125 duration-300 shadow-sm opacity-90"></div>
                            </td>
                          ))}
                          <td className="py-8 px-4">
                            <span className="text-[10px] text-gray-300 uppercase tracking-widest italic font-bold">休</span>
                          </td>
                       </tr>
                       <tr className="border-b border-gray-100/40">
                          <td className="py-8 px-4 text-xl font-light">晚</td>
                          {[1, 2, 3, 4, 5].map(i => (
                            <td key={i} className="py-8 px-4">
                              <div className="w-2.5 h-2.5 border border-gray-400 rotate-45 mx-auto transition-transform hover:scale-125 duration-300 shadow-sm opacity-90"></div>
                            </td>
                          ))}
                          <td className="py-8 px-4">
                             <span className="text-[10px] text-gray-300 uppercase tracking-widest italic font-bold">休</span>
                          </td>
                       </tr>
                     </tbody>
                   </table>
                </div>
            </div>
            
            <div className="mt-16 p-8 bg-warm-cream/50 border border-brand-accent/10 text-center">
              <p className="text-xs text-primary-brown/60 font-bold tracking-[0.3em] font-serif italic uppercase">
                * 本院採全預約制 | 週日及國定假日休診 | 敬請提前預約門診時間
              </p>
            </div>
         </div>
      </section>

      {/* Contact & Map Section - Integrated */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-10">
               <div className="space-y-4">
                 <h2 className="text-3xl font-serif text-primary-brown tracking-tight">門診預約與諮詢</h2>
                 <p className="text-gray-400 font-serif text-sm italic tracking-wide">高品質醫療，敬請提前特約預約</p>
               </div>
               <div className="space-y-8">
                 <div className="flex items-start space-x-6 group">
                   <div className="w-10 h-10 border border-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                     <Clock className="w-4 h-4" />
                   </div>
                   <div className="space-y-1">
                     <p className="text-primary-brown font-serif font-bold text-sm">診療時間</p>
                     <p className="text-gray-500 font-serif text-xs italic">Mon - Fri: 09:30 - 18:30</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-6 group">
                   <div className="w-10 h-10 border border-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                     <Phone className="w-4 h-4" />
                   </div>
                   <div className="space-y-1">
                     <p className="text-primary-brown font-serif font-bold text-sm">諮詢專線</p>
                     <p className="text-gray-500 font-serif text-xs italic">(02) XXXX-XXXX</p>
                   </div>
                 </div>
                 <div className="flex items-start space-x-6 group">
                   <div className="w-10 h-10 border border-brand-accent/20 rounded-full flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                     <MapPin className="w-4 h-4" />
                   </div>
                   <div className="space-y-1">
                     <p className="text-primary-brown font-serif font-bold text-sm">本院位置</p>
                     <p className="text-gray-500 font-serif text-xs italic">台北市大安區南京東路...</p>
                   </div>
                 </div>
               </div>
               <div className="pt-6">
                 <button 
                   onClick={() => setPage('schedule')}
                   className="w-full py-5 bg-primary-brown text-white font-serif uppercase tracking-[0.4em] font-bold text-[10px] hover:bg-brand-accent transition-colors shadow-lg"
                 >
                   查看門診表
                 </button>
               </div>
            </div>
            <div className="lg:col-span-8 aspect-[21/9] bg-gray-100 relative group overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
                 className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[4s]" 
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-black/10"></div>
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                 <button onClick={() => setPage('about-location')} className="bg-white text-primary-brown px-8 py-3 font-serif text-xs uppercase tracking-[0.3em] font-bold shadow-2xl">
                   開啟地圖導航
                 </button>
               </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// --- Static Page Example (Intro) ---
const IntroPage = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-40 pb-32 max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-12 gap-20 items-center">
      <div className="lg:col-span-5 space-y-12">
        <div className="space-y-4">
           <div className="w-12 h-px bg-brand-accent mb-6"></div>
           <h2 className="text-4xl md:text-5xl font-serif text-primary-brown tracking-tight">院所介紹</h2>
           <p className="text-brand-accent font-serif italic tracking-[0.2em] uppercase text-xs font-bold font-sans">About Our Clinic</p>
        </div>
        <div className="space-y-8 text-gray-600 font-serif leading-relaxed text-lg italic text-justify opacity-90">
          <p>
            溫崇凱中醫診所座落於台北核心地帶，承襲「扶原中醫」對傳統醫學的敬意，同時開創「現代針灸學」之先河。
            我們深信醫療不應僅是消除病痛，更是喚醒身體原有的修復記憶。
          </p>
          <p>
            在這裡，我們不只看診，更是與您的身體對話。每一次的施針，都是一場精準的修復導引，致力於在喧囂的都市中，為每位患者建立一座身心平衡的避風港。
          </p>
        </div>
        <div className="p-12 bg-white border border-brand-accent/20 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-warm-cream/50 rounded-full -mr-16 -mt-16"></div>
          <h4 className="text-xl font-serif text-primary-brown mb-6 flex items-center">
            <span className="w-8 h-px bg-brand-accent mr-4"></span>
            經營理念
          </h4>
          <p className="text-gray-500 font-serif leading-loose italic relative z-10">
            「從胚胎學出發，探索人類修復的終極奧秘。」<br />
            溫醫師深研神經學與胚胎系統，將耳穴、頭皮針與現代科學對接，提供精準且具備溫度的醫療服務。
          </p>
        </div>
      </div>
      <div className="lg:col-span-7 space-y-10">
        <div className="relative group overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1512036667332-24297621c0ad?auto=format&fit=crop&q=80" 
            alt="Clinic Interior TCM Cabinet" 
            className="w-full h-auto grayscale-[0.1] group-hover:scale-105 transition-transform duration-1000 shadow-2xl" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 border border-brand-accent/10 pointer-events-none"></div>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <div className="bg-white p-10 space-y-6 border border-brand-accent/10 shadow-lg hover:shadow-2xl transition-all duration-700">
            <div className="w-14 h-14 bg-warm-cream flex items-center justify-center text-brand-accent rounded-sm mb-6">
              <Sparkles className="w-7 h-7" />
            </div>
            <h5 className="text-2xl font-serif text-primary-brown font-bold tracking-tight">現代針灸學</h5>
            <p className="text-gray-400 text-sm font-serif leading-relaxed italic">系統化、科學化的治療體系，超越傳統經驗醫學的侷限。</p>
          </div>
          <div className="bg-white p-10 space-y-6 border border-brand-accent/10 shadow-lg hover:shadow-2xl transition-all duration-700">
            <div className="w-14 h-14 bg-warm-cream flex items-center justify-center text-brand-accent rounded-sm mb-6">
              <Stethoscope className="w-7 h-7" />
            </div>
            <h5 className="text-2xl font-serif text-primary-brown font-bold tracking-tight">疑難雜症突破</h5>
            <p className="text-gray-400 text-sm font-serif leading-relaxed italic">針對神經系統失調、長期免疫異常等重症，提供突破性治療方案。</p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const LocationPage = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-40 pb-32 max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-20 items-start">
      <div className="space-y-16">
        <div className="space-y-4">
           <div className="w-12 h-px bg-brand-accent mb-6"></div>
           <h2 className="text-4xl md:text-5xl font-serif text-primary-brown tracking-tight">院所位置</h2>
           <p className="text-brand-accent font-serif italic tracking-[0.2em] uppercase text-xs font-bold font-sans">Our Location</p>
        </div>
        
        <div className="grid gap-12">
          <div className="group space-y-4">
            <div className="flex items-center space-x-8 text-primary-brown">
              <div className="w-16 h-16 border border-brand-accent/30 rounded-sm flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all duration-700 shadow-lg bg-white">
                <MapPin className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-serif font-bold tracking-tight">診所地址</h4>
                <p className="text-gray-500 font-serif italic text-lg opacity-80">台北市大安區南京東路 XXX 號 2 樓</p>
              </div>
            </div>
          </div>

          <div className="group space-y-4">
            <div className="flex items-center space-x-8 text-primary-brown">
              <div className="w-16 h-16 border border-brand-accent/30 rounded-sm flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all duration-700 shadow-lg bg-white">
                <Phone className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-serif font-bold tracking-tight">預約專線</h4>
                <p className="text-gray-500 font-serif italic text-lg opacity-80">(02) XXXX-XXXX</p>
              </div>
            </div>
          </div>

          <div className="group space-y-4">
            <div className="flex items-center space-x-8 text-primary-brown">
              <div className="w-16 h-16 border border-brand-accent/30 rounded-sm flex items-center justify-center group-hover:bg-brand-accent group-hover:text-white transition-all duration-700 shadow-lg bg-white">
                <Clock className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-serif font-bold tracking-tight">服務時間</h4>
                <p className="text-gray-500 font-serif italic text-lg opacity-80">週一至週六，預約特約門診時間</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-12 border border-brand-accent/10 relative overflow-hidden group shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <h5 className="text-xl font-serif font-bold text-primary-brown">交通與環境資訊</h5>
              <p className="text-gray-400 font-serif italic text-sm leading-relaxed">近捷運南京復興站，3 號出口步行約 5 分鐘。<br />診所周邊有收費停車場，方便開車前來的患者。</p>
            </div>
            <button className="h-14 w-14 shrink-0 bg-warm-cream border border-brand-accent/20 text-brand-accent hover:bg-brand-accent hover:text-white transition-all shadow-xl group-hover:rotate-12 duration-500 flex items-center justify-center">
               <Globe className="w-7 h-7" />
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-1 bg-brand-accent/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
        </div>
      </div>
      
      <div className="relative group overflow-hidden border border-brand-accent/10 shadow-2xl">
         <img 
           src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80" 
           className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
           referrerPolicy="no-referrer"
         />
         <div className="absolute inset-0 bg-warm-cream/10"></div>
      </div>
    </div>
  </motion.div>
);

const DoctorPage = () => {
  const doctors = [
    {
      name: "溫崇凱",
      title: "院長",
      tagline: "溫氏現代針灸學創始人",
      quote: "「醫理之最高境界，在於化繁為簡、回歸本初。」",
      bio: "溫崇凱醫師深耕針灸臨床三十餘載，結合現代醫學解剖與胚胎發育觀點，首創「溫氏現代針灸」。不拘泥於傳統十四經絡，而是以能量與資訊的微調，喚醒身體沈睡的修復機制。",
      experience: [
        { year: "1995", title: "中醫針灸臨床研究會 副理事長" },
        { year: "2000", title: "創立溫氏現代針灸學體系" },
        { year: "2010", title: "兩岸三地針灸學術研討會 主講人" },
        { year: "至今", title: "溫崇凱中醫診所 院長" }
      ],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b1f8?auto=format&fit=crop&q=80"
    },
    {
      name: "蔡醫師",
      title: "主治醫師",
      tagline: "現代醫學與傳統針灸的實踐者",
      quote: "「以精細的觀察與溫柔的手法，陪伴患者走過康復之路。」",
      bio: "蔡醫師擁有紮實的傳統中醫背景，並深度鑽研溫氏現代針灸技術。擅長透過脈象與症狀的雙重對照，為患者制定個人化的精準治療方案。",
      experience: [
        { year: "經歷", title: "知名中醫診所 主治醫師" },
        { year: "專長", title: "傳統中醫內科、婦科調理" },
        { year: "研究", title: "溫氏現代針灸臨床應用" },
        { year: "現任", title: "溫崇凱中醫診所 主治醫師" }
      ],
      image: "https://images.unsplash.com/photo-1559839734-2b71ef159963?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-40 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif text-primary-brown font-medium">醫師團隊</h2>
          <div className="w-16 h-px bg-brand-accent mx-auto"></div>
          <p className="text-brand-accent font-serif italic tracking-[0.2em] text-xs uppercase font-bold">Medical Professional Team</p>
        </div>
      </div>

      <div className="space-y-40">
        {doctors.map((doc, idx) => (
          <section key={idx} className={`max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            {/* Image Column */}
            <div className={`lg:col-span-5 relative ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <div className="relative z-10 fancy-border bg-white shadow-2xl overflow-hidden">
                <img 
                  src={doc.image} 
                  alt={doc.name} 
                  className="w-full h-[500px] object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className={`absolute -bottom-10 ${idx % 2 === 0 ? '-right-10' : '-left-10'} w-48 h-48 bg-brand-accent/5 -z-10 tcm-border-pattern rotate-45`}></div>
            </div>

            {/* Content Column */}
            <div className={`lg:col-span-7 space-y-8 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
              <div className="space-y-4">
                 <div className="flex items-center space-x-4">
                    <div className="w-12 h-px bg-brand-accent"></div>
                    <span className="text-xs uppercase tracking-[0.4em] font-bold text-brand-accent">{doc.title}介紹</span>
                 </div>
                 <h2 className="text-5xl font-serif text-primary-brown font-medium">
                   {doc.name} <span className="text-2xl text-primary-light-brown ml-2 italic">{doc.title}</span>
                 </h2>
                 <p className="text-lg text-gray-400 font-serif flex items-center italic">
                    <BookOpen className="w-5 h-5 mr-3 text-brand-accent" />
                    {doc.tagline}
                 </p>
              </div>

              <div className="space-y-6">
                 <p className="text-xl font-serif text-primary-brown leading-relaxed italic opacity-90 border-l-4 border-brand-accent pl-8 bg-warm-cream/30 py-4">
                   {doc.quote}
                 </p>
                 <p className="text-gray-500 font-serif leading-loose text-lg italic text-justify opacity-80">
                   {doc.bio}
                 </p>
              </div>

              <div className="pt-6">
                <h4 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-6">學術與經歷</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {doc.experience.map((exp, i) => (
                    <div key={i} className="flex items-center space-x-4 border-b border-brand-accent/10 pb-3 group">
                      <span className="text-[10px] font-bold text-brand-accent/50 group-hover:text-brand-accent transition-colors shrink-0">{exp.year}</span>
                      <span className="text-primary-brown font-serif italic text-sm">{exp.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </motion.div>
  );
};

const TestimonialsStoriesPage = () => {
  const categoryHierarchy: Record<string, string[]> = {
    "全部": [],
    "婦科": ["全部", "乳腺炎", "子宮內膜增生", "子宮肌腺症", "子宮肌瘤", "經痛", "月經失調", "陰道黴菌感染", "先兆型流產", "經前症候群", "卵巢水泡", "子宮內膜異位症", "未分類"],
    "泌尿科": ["全部", "小便灼熱感", "殘尿", "尿道炎", "夜尿", "會陰腫脹", "急尿", "小兒尿床", "膀胱癌", "咳嗽漏尿", "頻尿", "漏尿", "大小便失禁", "排尿困難", "攝護腺肥大", "未分類"],
    "呼吸胸腔科": ["全部", "咳嗽", "喘不過氣", "慢性阻塞肺病", "乾咳", "胸悶", "氣喘", "先天性肺部囊腫", "未分類"],
    "腫瘤科": ["全部", "子宮內膜癌", "未分類"],
    "一般內科": ["全部", "未分類"],
    "新陳代謝科": ["全部", "未分類"],
    "胃腸肝膽科": ["全部", "未分類"],
    "腎臟科": ["全部", "未分類"],
    "心臟內科": ["全部", "未分類"],
    "風濕過敏免疫科": ["全部", "未分類"],
    "一般外科": ["全部", "未分類"],
    "神經外科": ["全部", "未分類"],
    "精神科": ["全部", "未分類"],
    "神經內科": ["全部", "未分類"],
    "骨科": ["全部", "未分類"],
    "皮膚科": ["全部", "未分類"],
    "口腔外科": ["全部", "未分類"],
    "耳鼻喉科": ["全部", "未分類"],
    "眼科": ["全部", "未分類"],
    "罕見疾病": ["全部", "未分類"],
    "乳房外科": ["全部", "未分類"],
    "復健科": ["全部", "未分類"],
    "疼痛科": ["全部", "未分類"],
    "消化內科": ["全部", "未分類"],
    "兒童神經科": ["全部", "未分類"]
  };

  const [mainCategory, setMainCategory] = useState("全部");
  const [subCategory, setSubCategory] = useState("");

  const mainCategories = Object.keys(categoryHierarchy);
  const subCategories = categoryHierarchy[mainCategory] || [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-40 pb-32">
      {/* Header with Specific Quote */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-24 space-y-12">
        <div className="space-y-4">
           <h2 className="text-4xl md:text-5xl font-serif text-primary-brown font-medium">實例分享</h2>
           <div className="w-12 h-px bg-brand-accent mx-auto"></div>
           <p className="text-brand-accent font-serif italic tracking-[0.2em] uppercase text-xs font-bold">Patient Success Stories</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto py-8">
           <Quote className="absolute -top-4 -left-4 w-12 h-12 text-brand-accent/10" />
           <p className="text-lg md:text-xl font-serif text-primary-brown leading-[2.2] text-justify italic opacity-90 relative z-10">
              敬愛的患者朋友：感謝您們的慷慨分享，您們也許不知道，許多來自各地的患者，他們沒有熟識的親友介紹，憑藉的就只是您們的肺腑見證、而鼓起勇氣不遠千里過來，您們凝聚的影響比山還高、造就的美德比海還深，無私的分享宛若春陽、帶給每位求助無門者信心與希望。(摘自2011院長感謝信)
           </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-end mb-16 gap-6 px-4">
          <div className="flex items-center space-x-6">
            <span className="text-xl font-serif text-primary-brown font-bold whitespace-nowrap">文章分類</span>
            
            {/* Main Category Dropdown */}
            <div className="relative min-w-[160px]">
              <select 
                value={mainCategory}
                onChange={(e) => {
                  setMainCategory(e.target.value);
                  setSubCategory("");
                }}
                className="w-full bg-[#F5F3F0] border border-[#C5B9A5] appearance-none px-4 py-2.5 text-base font-serif text-primary-brown focus:outline-none rounded-sm transition-all cursor-pointer"
              >
                {mainCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown className="w-4 h-4 text-primary-brown/60" />
              </div>
            </div>

            {/* Sub Category Dropdown */}
            <div className="relative min-w-[200px]">
              <select 
                value={subCategory}
                disabled={mainCategory === "全部"}
                onChange={(e) => setSubCategory(e.target.value)}
                className={`w-full bg-[#F5F3F0] border border-[#C5B9A5] appearance-none px-4 py-2.5 text-base font-serif text-primary-brown focus:outline-none rounded-sm transition-all cursor-pointer ${mainCategory === "全部" ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <option value="" disabled>{mainCategory === "全部" ? "請先選擇分類" : "全部"}</option>
                {subCategories.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <ChevronDown className="w-4 h-4 text-primary-brown/60" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <motion.div 
              key={i} 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white p-10 border border-brand-accent/5 shadow-lg group hover:shadow-2xl transition-all duration-700 space-y-8"
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest">Case #00{i}</span>
                <Heart className="w-4 h-4 text-brand-accent/30 group-hover:text-brand-accent transition-colors" />
              </div>
              <h4 className="text-2xl font-serif text-primary-brown font-bold tracking-tight">見證標題範例 {i}</h4>
              <p className="text-gray-500 font-serif italic text-sm leading-relaxed line-clamp-4 opacity-80">
                患者分享內容預載中... 這裡將會顯示來自患者的真實心聲與康復歷程。溫崇凱中醫診所感謝每一位無私分享的生命鬥士。
              </p>
              <div className="pt-6 border-t border-brand-accent/10 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold italic">神經內科</span>
                <button className="text-brand-accent text-xs font-bold font-serif flex items-center group-hover:mr-2 transition-all">
                  閱讀完整故事 <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsMediaPage = () => (
  <div className="pt-40 pb-40 text-center space-y-12">
    <h2 className="text-5xl font-serif text-primary-brown">媒體專訪</h2>
    <p className="text-gray-500 italic font-serif text-xl">紀錄溫氏現代針灸的科學足跡</p>
    <div className="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-10">
       {[1, 2].map(i => (
         <div key={i} className="aspect-video bg-warm-cream border border-brand-accent/20 flex items-center justify-center group cursor-pointer overflow-hidden shadow-2xl">
            <div className="text-brand-accent opacity-40 group-hover:opacity-100 transition-all font-serif italic">Video Placeholder</div>
         </div>
       ))}
    </div>
  </div>
);

const SchedulePage = () => (
  <div className="pt-40 pb-40 text-center space-y-16 bg-warm-cream/20">
    <div className="max-w-4xl mx-auto px-6 space-y-8">
      <h2 className="text-5xl font-serif text-primary-brown uppercase tracking-tighter">門診時間表</h2>
      <p className="text-brand-accent font-serif italic text-lg opacity-80">
        本院採「預約制」精緻診療，敬請提前預約
      </p>
      
      <div className="overflow-x-auto bg-white shadow-2xl border border-brand-accent/10 p-4 md:p-10">
        <table className="w-full font-serif border-collapse">
          <thead>
            <tr className="border-b-2 border-brand-accent/20">
              <th className="py-6 px-4 text-brand-accent uppercase text-xs tracking-widest">時段</th>
              <th className="py-6 px-4 text-primary-brown">週一</th>
              <th className="py-6 px-4 text-primary-brown">週二</th>
              <th className="py-6 px-4 text-primary-brown">週三</th>
              <th className="py-6 px-4 text-primary-brown">週四</th>
              <th className="py-6 px-4 text-primary-brown">週五</th>
              <th className="py-6 px-4 text-primary-brown">週六</th>
            </tr>
          </thead>
          <tbody className="text-primary-brown">
            <tr className="border-b border-brand-accent/5 hover:bg-warm-cream/30 transition-colors">
              <td className="py-8 font-bold text-xs uppercase tracking-widest text-brand-accent/50 bg-warm-cream/10">上午門診<br/><span className="font-light opacity-60">09:30-12:30</span></td>
              <td className="py-8">●</td><td className="py-8">●</td><td className="py-8 text-brand-accent font-bold">溫</td><td className="py-8">●</td><td className="py-8">●</td><td className="py-8">●</td>
            </tr>
            <tr className="border-b border-brand-accent/5 hover:bg-warm-cream/30 transition-colors">
              <td className="py-8 font-bold text-xs uppercase tracking-widest text-brand-accent/50 bg-warm-cream/10">下午門診<br/><span className="font-light opacity-60">14:00-18:30</span></td>
              <td className="py-8">●</td><td className="py-8 text-brand-accent font-bold">溫</td><td className="py-8">●</td><td className="py-8 text-brand-accent font-bold">溫</td><td className="py-8">●</td><td className="py-8 text-gray-300">休</td>
            </tr>
            <tr className="hover:bg-warm-cream/30 transition-colors">
              <td className="py-8 font-bold text-xs uppercase tracking-widest text-brand-accent/50 bg-warm-cream/10">晚間門診<br/><span className="font-light opacity-60">19:00-21:00</span></td>
              <td className="py-8">●</td><td className="py-8">●</td><td className="py-8">●</td><td className="py-8">●</td><td className="py-8 text-brand-accent font-bold">溫</td><td className="py-8 text-gray-300">休</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="pt-10 space-y-4 text-gray-400 italic font-serif text-sm">
        <p>* 「溫」為溫崇凱院長門診。其餘時段由本院主治醫師群聯合診治。</p>
        <p>* 門診調動資訊將即時公佈於官網與診所 LINE。</p>
      </div>
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-primary-brown text-white py-10 relative overflow-hidden">
    <div className="absolute inset-0 tcm-border-pattern opacity-5 pointer-events-none"></div>
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        {/* Brand */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 border border-white/30 flex items-center justify-center rounded-sm rotate-45 bg-white">
             <span className="text-primary-brown font-serif font-bold text-xl -rotate-45">溫</span>
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold tracking-widest leading-none">溫崇凱中醫診所</h3>
            <p className="text-[9px] text-white/70 font-bold uppercase tracking-[0.4em] mt-1">Wen Chung-Kai TCM Clinic</p>
          </div>
        </div>

        {/* Contact Info Snippet */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-sm font-serif italic text-white/90">
          <div className="space-y-1">
            <p className="opacity-100 font-bold text-white text-[10px] uppercase tracking-widest mb-1">聯絡專線</p>
            <p>(02) XXXX-XXXX | @drwen_tcm</p>
          </div>
          <div className="space-y-1">
            <p className="opacity-100 font-bold text-white text-[10px] uppercase tracking-widest mb-1">院所位置</p>
            <p>台北市大安區南京東路 XXX 號 2 樓</p>
          </div>
        </div>

        {/* Social Actions */}
        <div className="flex space-x-4">
          <button className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"><MessageSquare className="w-4 h-4" /></button>
          <button className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"><Globe className="w-4 h-4" /></button>
          <button className="p-2 border border-white/20 rounded-full hover:bg-white/10 transition-all duration-300"><Phone className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-[9px] font-bold tracking-[0.3em] uppercase">
        <p>© 2026 Wen Chung-Kai TCM Clinic.</p>
        <p>Medical Excellence for Modern Times</p>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [page, setPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'home': return <HomePage setPage={setPage} />;
      case 'about-intro': return <IntroPage />;
      case 'about-location': return <LocationPage />;
      case 'doctor': return <DoctorPage />;
      case 'testimonials-stories': return <TestimonialsStoriesPage />;
      case 'testimonials-media': return <TestimonialsMediaPage />;
      case 'schedule': return <SchedulePage />;
      default: return (
        <div className="pt-60 pb-40 text-center space-y-8">
          <h2 className="text-4xl font-serif text-primary-brown">《{page}》分頁內容整理中</h2>
          <p className="text-gray-500 italic font-serif">醫案整理與專題介紹正在彙整，請稍候重試。</p>
          <button onClick={() => setPage('home')} className="px-10 py-3 border border-primary-brown text-primary-brown font-serif hover:bg-white transition-all">回到首頁</button>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen selection:bg-brand-accent selection:text-white bg-warm-cream">
      <Navbar setPage={setPage} currentPage={page} />
      
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
