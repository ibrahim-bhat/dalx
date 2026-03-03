import React from 'react';
import { motion } from 'motion/react';
import { 
  Megaphone, 
  Code2, 
  Video, 
  Palette, 
  TrendingUp, 
  ArrowRight,
  CheckCircle2,
  Monitor,
  Smartphone,
  Database,
  Camera,
  Layers,
  Settings,
  Users,
  Star,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

const services = [
  {
    title: "Ads & PPC",
    description: "High-converting advertising campaigns across Google, Meta, and LinkedIn.",
    icon: Megaphone,
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    title: "Video Editing",
    description: "Professional post-production for commercials, social media, and cinema.",
    icon: Video,
    color: "bg-purple-500/10 text-purple-600"
  },
  {
    title: "Graphic Design",
    description: "Brand identity, visual storytelling, and marketing materials that resonate.",
    icon: Palette,
    color: "bg-orange-500/10 text-orange-600"
  },
  {
    title: "Cinematography",
    description: "High-end film production, aerial shots, and cinematic storytelling.",
    icon: Camera,
    color: "bg-rose-500/10 text-rose-600"
  },
  {
    title: "Website Building",
    description: "Modern, responsive, and high-performance websites built for conversion.",
    icon: Monitor,
    color: "bg-emerald-500/10 text-emerald-600"
  },
  {
    title: "Custom Software",
    description: "Tailored software solutions designed to solve complex business problems.",
    icon: Code2,
    color: "bg-indigo-500/10 text-indigo-600"
  },
  {
    title: "App Development",
    description: "Native and cross-platform mobile apps with seamless user experiences.",
    icon: Smartphone,
    color: "bg-cyan-500/10 text-cyan-600"
  },
  {
    title: "Management Systems",
    description: "Custom ERP, CRM, and internal management software for efficiency.",
    icon: Database,
    color: "bg-amber-500/10 text-amber-600"
  }
];

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO, TechFlow",
    content: "Dalx transformed our digital presence. Their custom software solution saved us hundreds of hours monthly.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Marcus Chen",
    role: "Marketing Director, GlobalX",
    content: "The cinematography and video editing team at Dalx is world-class. Our brand film received millions of views.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  }
];

const processSteps = [
  { title: "Discovery", desc: "We dive deep into your business goals and target audience.", icon: Globe },
  { title: "Strategy", desc: "Crafting a tailored roadmap for your digital success.", icon: Zap },
  { title: "Execution", desc: "Our experts build, design, and launch your project.", icon: Settings },
  { title: "Growth", desc: "Continuous optimization and support for long-term scale.", icon: TrendingUp }
];

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center">
                <span className="text-brand-accent font-display font-bold text-xl">D</span>
              </div>
              <span className="font-display font-bold text-2xl tracking-tighter">DALX</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium hover:text-brand-accent transition-colors">Services</a>
              <a href="#portfolio" className="text-sm font-medium hover:text-brand-accent transition-colors">Portfolio</a>
              <a href="#about" className="text-sm font-medium hover:text-brand-accent transition-colors">About</a>
              <a href="#contact" className="text-sm font-medium hover:text-brand-accent transition-colors">Contact</a>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-primary text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                </span>
                Next-Gen Digital Agency
              </div>
              <h1 className="text-6xl lg:text-8xl font-bold leading-[0.9] mb-8">
                We Build <br />
                <span className="text-gradient">Digital</span> <br />
                Excellence.
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                Transforming brands through innovative tech, creative design, and strategic marketing. Your vision, our execution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-brand-primary text-white px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:scale-105 transition-transform group"
                >
                  Start a Project
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-brand-primary px-8 py-4 rounded-full font-bold hover:bg-brand-primary hover:text-white transition-all"
                >
                  View Our Work
                </button>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000" 
                  alt="Digital Agency Work"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div className="text-white">
                    <p className="text-sm font-bold uppercase tracking-widest mb-2">Featured Project</p>
                    <h3 className="text-2xl font-display font-bold">Modern SaaS Platform</h3>
                  </div>
                </div>
              </div>
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 hidden sm:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-accent/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">150%</p>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-tighter">Avg. ROI Increase</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Our Expertise</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Comprehensive digital solutions designed to scale your business. From creative content to complex engineering.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                <div className={`w-12 h-12 ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <a href="#" className="inline-flex items-center gap-2 text-xs font-bold hover:text-brand-accent transition-colors uppercase tracking-wider">
                  Learn More <ArrowRight className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">How We Work</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A streamlined, transparent process that ensures quality and speed.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-12 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
            
            {processSteps.map((step, index) => (
              <div key={index} className="relative z-10 text-center">
                <div className="w-16 h-16 bg-white border-4 border-gray-50 shadow-lg rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-6 h-6 text-brand-accent" />
                </div>
                <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">Selected Works</h2>
              <p className="text-gray-600 text-lg">
                A glimpse into the digital experiences we've crafted for industry leaders and ambitious startups.
              </p>
            </div>
            <button className="text-brand-primary font-bold border-b-2 border-brand-primary pb-1 hover:text-brand-accent hover:border-brand-accent transition-all">
              View All Projects
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Vanguard E-commerce",
                category: "Web Development & Ads",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000"
              },
              {
                title: "Lumina Brand Identity",
                category: "Creative Design",
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1000"
              }
            ].map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] rounded-3xl overflow-hidden bg-gray-100 mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-2">{project.category}</p>
                <h3 className="text-3xl font-bold group-hover:text-brand-accent transition-colors">{project.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="about" className="py-24 bg-brand-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-6xl font-bold mb-12 leading-tight">
                Why Brands <br />
                Choose <span className="text-brand-accent">Dalx</span>
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Strategic Approach", desc: "We don't just execute; we plan for long-term growth." },
                  { title: "Cutting-Edge Tech", desc: "Using the latest tools to give you a competitive edge." },
                  { title: "Transparent Reporting", desc: "Real-time dashboards to track your campaign performance." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="mt-1">
                      <CheckCircle2 className="w-6 h-6 text-brand-accent" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="aspect-[3/4] bg-gray-800 rounded-2xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=500" alt="Team" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
                  </div>
                  <div className="aspect-square bg-brand-accent rounded-2xl flex items-center justify-center p-8">
                    <p className="text-brand-primary text-4xl font-bold leading-none">10+ <br /><span className="text-sm uppercase tracking-widest">Years Exp</span></p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-800 rounded-2xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=500" alt="Office" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
                  </div>
                  <div className="aspect-[3/4] bg-gray-700 rounded-2xl overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=500" alt="Meeting" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">What Our Clients Say</h2>
              <p className="text-gray-600 mb-8">
                Don't just take our word for it. We've helped hundreds of brands achieve digital dominance.
              </p>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-accent text-brand-accent" />
                ))}
                <span className="ml-2 font-bold">4.9/5 Rating</span>
              </div>
            </div>
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                  <p className="text-gray-600 italic mb-8">"{t.content}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
                    <div>
                      <h5 className="font-bold">{t.name}</h5>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-[3rem] p-8 lg:p-20">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8">Let's Create Something Great.</h2>
                <p className="text-gray-600 text-lg mb-12">
                  Have a project in mind? We'd love to hear about it. Fill out the form and our team will get back to you within 24 hours.
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Email Us</p>
                    <p className="text-2xl font-bold">hello@dalx.com</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Visit Us</p>
                    <p className="text-2xl font-bold">123 Digital Way, Tech City, TC 10101</p>
                  </div>
                </div>
              </div>
              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Full Name</label>
                    <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Email Address</label>
                    <input type="email" className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Service Interested In</label>
                  <select className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all appearance-none">
                    <option>Digital Marketing</option>
                    <option>Tech Solutions</option>
                    <option>Video Editing</option>
                    <option>Creative Design</option>
                    <option>Ad Campaigns</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">Message</label>
                  <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-brand-accent focus:ring-4 focus:ring-brand-accent/10 outline-none transition-all" placeholder="Tell us about your project..."></textarea>
                </div>
                <button className="w-full bg-brand-primary text-white py-5 rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-lg shadow-brand-primary/20">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <span className="text-brand-accent font-display font-bold text-sm">D</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tighter">DALX</span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-gray-500">
              <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Cookies</a>
            </div>
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Dalx Digital Agency. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
