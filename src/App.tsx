import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sprout, 
  BarChart3, 
  Calendar, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Upload, 
  Play, 
  Loader2, 
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  Package,
  Droplets,
  Sun,
  Wind
} from 'lucide-react';
import { generateFarmVideo, downloadVideo } from './services/aiService';

// --- Types ---

type NavItem = {
  label: string;
  icon: React.ElementType;
  id: string;
};

// --- Components ---

const Navbar = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'Features', icon: Sprout, id: 'features' },
    { label: 'Dashboard', icon: BarChart3, id: 'dashboard' },
    { label: 'AI Simulation', icon: Play, id: 'ai-demo' },
    { label: 'Testimonials', icon: CheckCircle2, id: 'testimonials' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#1a4d2e]/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <Sprout className="text-[#1a4d2e]" size={24} />
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-white' : 'text-[#1a4d2e]'}`}>
            Mogitech Shamba
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                setActiveSection(item.id);
              }}
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-white/80 hover:text-white' : 'text-[#1a4d2e]/80 hover:text-[#1a4d2e]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button className="bg-[#d4a373] hover:bg-[#c69263] text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className={isScrolled ? 'text-white' : 'text-[#1a4d2e]'} /> : <Menu className={isScrolled ? 'text-white' : 'text-[#1a4d2e]'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1a4d2e] overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-white/90 text-lg font-medium text-left flex items-center gap-3"
                >
                  <item.icon size={20} />
                  {item.label}
                </button>
              ))}
              <button className="bg-[#d4a373] text-white w-full py-3 rounded-xl font-bold mt-4">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#fdfbf7]">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-[#e8f5e9] rounded-l-[100px] -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-[#d4a373]/10 rounded-tr-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-[#1a4d2e]/10 text-[#1a4d2e] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-[#1a4d2e] rounded-full animate-pulse" />
            V1.0 Now Available
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-[#1a4d2e] leading-[1.1] mb-6 tracking-tight">
            Cultivate <br />
            <span className="text-[#d4a373] font-serif italic">Intelligence.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
            The all-in-one Farm ERP designed for modern African agriculture. Track finances, manage crops, and predict yields with AI precision.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-[#1a4d2e] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-[#143d24] transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2">
              Start Free Trial <TrendingUp size={20} />
            </button>
            <button 
              onClick={() => document.getElementById('ai-demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-[#1a4d2e] border border-[#1a4d2e]/20 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-50 transition-all flex items-center gap-2"
            >
              <Play size={20} fill="currentColor" /> Watch Demo
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-8 text-gray-500">
            <div className="flex -space-x-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                  <img src={`https://picsum.photos/seed/farmer${i}/100/100`} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div className="text-sm">
              <span className="font-bold text-[#1a4d2e]">2,000+</span> Farmers <br /> trust Mogitech
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          {/* Mockup Container */}
          <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
            <div className="bg-[#1a4d2e] h-8 rounded-t-2xl flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="bg-gray-50 p-4 rounded-b-2xl min-h-[400px]">
              {/* Dashboard Mockup Content */}
              <div className="grid grid-cols-12 gap-4 h-full">
                {/* Sidebar */}
                <div className="col-span-3 bg-[#1a4d2e] rounded-xl p-4 text-white flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Sprout size={16} />
                    </div>
                    <span className="font-bold text-sm">Mogitech</span>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-white/10 p-2 rounded-lg text-sm flex items-center gap-2"><BarChart3 size={14} /> Dashboard</div>
                    <div className="text-white/60 p-2 text-sm flex items-center gap-2"><Calendar size={14} /> Calendar</div>
                    <div className="text-white/60 p-2 text-sm flex items-center gap-2"><Package size={14} /> Inventory</div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-white/10">
                    <div className="text-white/60 p-2 text-sm flex items-center gap-2"><Settings size={14} /> Settings</div>
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="col-span-9 flex flex-col gap-4">
                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Revenue', val: 'KES 328k', trend: '+12%', color: 'text-green-600' },
                      { label: 'Expenses', val: 'KES 232k', trend: '+4%', color: 'text-red-500' },
                      { label: 'Net Profit', val: 'KES 96k', trend: '+24%', color: 'text-green-600' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100">
                        <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                        <div className="font-bold text-lg text-gray-900">{stat.val}</div>
                        <div className={`text-xs ${stat.color} font-medium`}>{stat.trend}</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Chart Area */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold text-gray-800 text-sm">Financial Performance</h3>
                      <div className="text-xs text-gray-400">Last 6 Months</div>
                    </div>
                    <div className="h-32 flex items-end justify-between gap-2 px-2">
                      {[40, 60, 45, 70, 55, 80, 65, 90].map((h, i) => (
                        <div key={i} className="w-full bg-[#e8f5e9] rounded-t-sm relative group">
                          <div 
                            className="absolute bottom-0 left-0 right-0 bg-[#1a4d2e] rounded-t-sm transition-all duration-1000"
                            style={{ height: `${h}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                     <h3 className="font-semibold text-gray-800 text-sm mb-3">Upcoming Tasks</h3>
                     <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg border-l-4 border-red-400">
                          <div className="text-xs font-medium text-gray-700">Maize Harvest (Block A)</div>
                          <span className="text-[10px] bg-white px-2 py-0.5 rounded text-red-500 font-bold">HIGH</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                          <div className="text-xs font-medium text-gray-700">Fertilizer App</div>
                          <span className="text-[10px] bg-white px-2 py-0.5 rounded text-yellow-600 font-bold">MED</span>
                        </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -right-8 top-20 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 max-w-[200px]"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-full text-green-600"><CheckCircle2 size={16} /></div>
              <div>
                <div className="text-xs font-bold text-gray-800">Stock Reordered</div>
                <div className="text-[10px] text-gray-500">DAP Fertilizer</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute -left-8 bottom-20 bg-[#1a4d2e] text-white p-4 rounded-2xl shadow-xl max-w-[180px]"
          >
            <div className="flex items-center gap-2 mb-1">
              <Sun size={16} className="text-yellow-400" />
              <span className="text-xs font-bold">Nakuru Weather</span>
            </div>
            <div className="text-2xl font-bold">24°C</div>
            <div className="text-[10px] opacity-80">Perfect for planting</div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      title: "Smart Inventory",
      desc: "Never run out of supplies. Automated alerts for low stock on fertilizers, seeds, and feed.",
      icon: Package,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Crop Cycles",
      desc: "Track every stage of growth from planting to harvest. Optimize yields with historical data.",
      icon: Sprout,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Financial Health",
      desc: "Know your numbers. Track revenue, expenses, and profit margins in real-time.",
      icon: TrendingUp,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Weather Insights",
      desc: "Integrated local weather forecasting to help you plan critical farm operations.",
      icon: Sun,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-[#1a4d2e] mb-4">Everything you need to grow</h2>
          <p className="text-gray-600 text-lg">Mogitech Shamba replaces spreadsheets and notebooks with a powerful, easy-to-use digital platform.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-[#fdfbf7] border border-[#f0ebe0] hover:shadow-lg transition-all"
            >
              <div className={`w-14 h-14 ${f.color} rounded-2xl flex items-center justify-center mb-6`}>
                <f.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VeoDemo = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "9:16">("16:9");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!image) return;
    
    // Check for API Key
    if (window.aistudio && !window.aistudio.hasSelectedApiKey()) {
       try {
         const success = await window.aistudio.openSelectKey();
         if (!success) return; // User cancelled or failed
       } catch (e) {
         console.error("Failed to select key", e);
         setError("Please select a Google Cloud API Key to continue.");
         return;
       }
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedVideo(null);

    try {
      // Extract base64 data (remove header)
      const base64Data = image.split(',')[1];
      
      const videoUri = await generateFarmVideo(
        base64Data, 
        prompt || "Cinematic drone shot of this farm, crops swaying in the wind, sunlight, high quality, photorealistic", 
        aspectRatio
      );
      
      // We need to download/proxy the video to display it
      const videoUrl = await downloadVideo(videoUri);
      setGeneratedVideo(videoUrl);
      
    } catch (err: any) {
      setError(err.message || "Failed to generate video. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="ai-demo" className="py-24 bg-[#1a4d2e] text-white overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm font-semibold mb-6 border border-white/20">
              <Play size={14} className="fill-white" />
              <span>Powered by Veo AI</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Visualize Your Farm's Future</h2>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Upload a photo of your land or crops, and let our AI simulate growth, weather conditions, or future infrastructure. See the potential of your shamba before you plant a single seed.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d4a373] flex items-center justify-center shrink-0">
                  <Upload size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">1. Upload Photo</h4>
                  <p className="text-white/60">Take a picture of your field or crops.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d4a373] flex items-center justify-center shrink-0">
                  <Wind size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">2. Describe Effect</h4>
                  <p className="text-white/60">"Maize growing rapidly", "Heavy rain simulation", "Windy day".</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#d4a373] flex items-center justify-center shrink-0">
                  <Play size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">3. Generate Video</h4>
                  <p className="text-white/60">Watch your farm come to life in seconds.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 lg:p-8">
            <div className="space-y-6">
              {/* Image Upload Area */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`aspect-video rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden group ${image ? 'border-transparent' : 'border-white/30 hover:border-white/60 hover:bg-white/5'}`}
              >
                {generatedVideo ? (
                  <video 
                    src={generatedVideo} 
                    controls 
                    autoPlay 
                    loop 
                    className="w-full h-full object-cover"
                  />
                ) : image ? (
                  <>
                    <img src={image} alt="Upload" className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/50 p-3 rounded-full text-white">
                        <Upload size={24} />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <Upload size={48} className="mx-auto mb-4 text-white/40" />
                    <p className="font-medium text-white/80">Click to upload farm photo</p>
                    <p className="text-sm text-white/40 mt-2">Supports JPG, PNG</p>
                  </div>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              {/* Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Prompt (Optional)</label>
                  <input 
                    type="text" 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., A drone shot of healthy maize crops swaying in the wind"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
                  />
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-white/80 mb-2">Aspect Ratio</label>
                    <div className="flex bg-white/10 rounded-xl p-1">
                      <button 
                        onClick={() => setAspectRatio("16:9")}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${aspectRatio === "16:9" ? 'bg-white text-[#1a4d2e]' : 'text-white/60 hover:text-white'}`}
                      >
                        16:9
                      </button>
                      <button 
                        onClick={() => setAspectRatio("9:16")}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${aspectRatio === "9:16" ? 'bg-white text-[#1a4d2e]' : 'text-white/60 hover:text-white'}`}
                      >
                        9:16
                      </button>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <button 
                      onClick={handleGenerate}
                      disabled={!image || isGenerating}
                      className={`h-[50px] px-8 rounded-xl font-bold flex items-center gap-2 transition-all ${!image || isGenerating ? 'bg-gray-500 cursor-not-allowed opacity-50' : 'bg-[#d4a373] hover:bg-[#c69263] text-white hover:shadow-lg'}`}
                    >
                      {isGenerating ? <Loader2 className="animate-spin" /> : <Play fill="currentColor" />}
                      {isGenerating ? 'Generating...' : 'Animate'}
                    </button>
                  </div>
                </div>
                
                {error && (
                  <div className="bg-red-500/20 border border-red-500/50 text-red-200 p-3 rounded-xl text-sm flex items-center gap-2">
                    <AlertTriangle size={16} />
                    {error}
                  </div>
                )}
                
                <p className="text-xs text-white/40 text-center">
                  *Requires a paid Google Cloud Project with Vertex AI enabled.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#11301e] text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Sprout className="text-[#1a4d2e]" size={20} />
              </div>
              <span className="text-xl font-bold">Mogitech Shamba</span>
            </div>
            <p className="text-white/60 max-w-sm leading-relaxed">
              Empowering African farmers with data-driven tools for better yields, smarter financial tracking, and sustainable growth.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Product</h4>
            <ul className="space-y-4 text-white/60">
              <li className="hover:text-white cursor-pointer">Features</li>
              <li className="hover:text-white cursor-pointer">Pricing</li>
              <li className="hover:text-white cursor-pointer">API</li>
              <li className="hover:text-white cursor-pointer">Veo Simulation</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-white/60">
              <li className="hover:text-white cursor-pointer">About Us</li>
              <li className="hover:text-white cursor-pointer">Careers</li>
              <li className="hover:text-white cursor-pointer">Blog</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <p>© 2026 Mogitech Global. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="min-h-screen bg-[#fdfbf7] selection:bg-[#1a4d2e] selection:text-white">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      <Hero />
      <Features />
      <VeoDemo />
      <Footer />
    </div>
  );
}
