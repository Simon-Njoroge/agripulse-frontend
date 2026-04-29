import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  BarChart3, 
  Users, 
  Clock, 
  Lock,
  Star,
  Leaf,
  Bell,
  TrendingUp,
  ArrowRight,
  MapPin,
  Search,
  Zap
} from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate=useNavigate()

  const handleLogin=()=>{
    navigate({to: '/auth/login'})

  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Features', 'How It Works', 'Pricing', 'Contact'];

  const stats = [
    { value: '500+', label: 'Farms Managed' },
    { value: '50K+', label: 'Acres Monitored' },
    { value: '98%', label: 'Risk Detection Rate' },
    { value: '24/7', label: 'Real-time Updates' },
  ];

  const features = [
    { icon: <BarChart3 className="w-6 h-6" />, title: 'Smart Dashboard' },
    { icon: <Bell className="w-6 h-6" />, title: 'Risk Detection' },
    { icon: <Users className="w-6 h-6" />, title: 'Team Management' },
    { icon: <Clock className="w-6 h-6" />, title: 'Activity Timeline' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Performance Analytics' },
    { icon: <Lock className="w-6 h-6" />, title: 'Secure Access' },
  ];

  const testimonials = [
    {
      name: 'Farm Name',
      role: 'Farm',
      content: 'Troebotting progretions, coasamos soancces and mariniscated progress.',
    },
    {
      name: 'Foom Nomson',
      role: 'Foam',
      content: 'Woric crop progress and sponises cames and asatity wht lightness smart monitors.',
    },
    {
      name: 'Kerri-2xenon',
      role: 'Farm',
      content: 'I have a trnespooni-fiat and eneont orcieis soicaes are made from vecoes and eocos.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-50/50 to-white">
     
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xl font-bold text-gray-800">AgriPulse</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <button className="px-5 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 font-medium shadow-sm" onClick={handleLogin}>
              Sign In
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 px-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="block py-3 text-gray-600 hover:text-green-600 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <div className="flex flex-col space-y-3 pt-4 border-t mt-2">
              <button className="w-full px-5 py-2 text-gray-700 bg-white  cursor-pointer border border-gray-200 rounded-lg hover:bg-gray-50 transition font-medium" onClick={handleLogin}>
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

 
      <section className="pt-32 pb-16 px-4 md:px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center px-3 py-1 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-6">
                <Zap className="w-3.5 h-3.5 mr-1.5" />
                Smart Farming Intelligence
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Track Your Fields with{' '}
                <span className="text-green-600">Intelligent Insights</span>
              </h1>
              <p className="text-base text-gray-500 max-w-md mb-8 leading-relaxed">
                Monitor crop progress, detect risks early, and optimize your harvest with AgriPulse's smart field monitoring platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-all duration-200 shadow-sm flex items-center justify-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-6 py-2.5 bg-white text-gray-700 border border-gray-300 rounded-lg text-sm font-semibold hover:border-green-600 hover:text-green-600 transition-all duration-200">
                  Watch Demo
                </button>
              </div>
            </div>

            
            <div className="flex-1 w-full max-w-lg">
              <div className="relative">
               
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                
                  <div className="bg-gray-50 px-4 py-2.5 flex items-center gap-2 border-b border-gray-100">
                    <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                    <span className="ml-2 text-xs text-gray-400">AgriPulse Dashboard</span>
                  </div>
                
                  <div className="p-4">
                   
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="bg-green-50 rounded-lg p-2.5 text-center">
                        <p className="text-lg font-bold text-green-700">500+</p>
                        <p className="text-xs text-green-600">Farms</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2.5 text-center">
                        <p className="text-lg font-bold text-green-700">50K+</p>
                        <p className="text-xs text-green-600">Acres</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2.5 text-center">
                        <p className="text-lg font-bold text-green-700">98%</p>
                        <p className="text-xs text-green-600">Detection</p>
                      </div>
                    </div>
                   
                    <div className="bg-green-50 rounded-lg h-32 mb-3 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-4 left-4 w-16 h-12 bg-green-500 rounded-sm transform rotate-12"></div>
                        <div className="absolute top-8 right-8 w-20 h-14 bg-green-400 rounded-sm transform -rotate-6"></div>
                        <div className="absolute bottom-4 left-12 w-14 h-10 bg-green-500 rounded-sm transform rotate-3"></div>
                        <div className="absolute bottom-6 right-16 w-12 h-16 bg-green-300 rounded-sm transform rotate-45"></div>
                      </div>
                      <MapPin className="w-8 h-8 text-green-500 relative z-10" />
                    </div>
                   
                    <div className="text-xs">
                      <div className="bg-gray-50 rounded-t-lg px-2 py-1.5 flex justify-between items-center">
                        <span className="font-semibold text-gray-600">Field Table</span>
                        <span className="text-gray-400">View All →</span>
                      </div>
                      <div className="bg-white rounded-b-lg">
                        {[
                          { name: 'North Field', crop: 'Corn', stage: 'Growing', status: 'Active' },
                          { name: 'South Field', crop: 'Wheat', stage: 'Planted', status: 'Active' },
                          { name: 'East Field', crop: 'Soybeans', stage: 'Ready', status: 'At Risk' },
                        ].map((field, i) => (
                          <div key={i} className="flex items-center justify-between px-2 py-1.5 border-t border-gray-50">
                            <span className="text-gray-600">{field.name}</span>
                            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                              field.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {field.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              
                <div className="absolute -right-4 top-8 bg-white rounded-xl shadow-lg p-3 border border-gray-100">
                  <p className="text-lg font-bold text-gray-800">500+</p>
                  <p className="text-xs text-gray-500">Farms</p>
                </div>
                <div className="absolute -right-4 top-24 bg-white rounded-xl shadow-lg p-3 border border-gray-100">
                  <p className="text-lg font-bold text-gray-800">50K+</p>
                  <p className="text-xs text-gray-500">Acres</p>
                </div>
                <div className="absolute -right-4 top-40 bg-white rounded-xl shadow-lg p-3 border border-gray-100">
                  <p className="text-lg font-bold text-gray-800">98%</p>
                  <p className="text-xs text-gray-500">Risk Detection</p>
                </div>
              </div>
            </div>
          </div>

          
          <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    
      <section id="features" className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              Why Choose AgriPulse
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Everything You Need to Manage Your Fields
            </h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Monitor crop progress, detect risks early, and optimize your harvest with AgriPulse sensing platform.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 text-center group cursor-pointer">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-700 mx-auto mb-4 group-hover:bg-green-100 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-sm font-semibold text-gray-800">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section id="how-it-works" className="py-20 bg-white px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              Simple Setup
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How AgriPulse Works
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Add Your Fields', description: 'Add your vectors and your Fields and to consoresor your your feilds.', icon: <MapPin className="w-8 h-8" /> },
              { step: '2', title: 'Track Progress', description: 'Clean vectors with clacm vectors to and itenove your progress.', icon: <Search className="w-8 h-8" /> },
              { step: '3', title: 'Get Insights', description: 'Get sours and vniaaaceocud adminntrators and to iea insights.', icon: <TrendingUp className="w-8 h-8" /> },
            ].map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="text-center group flex-1">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mx-auto group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-base font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-xs text-gray-500 max-w-48 mx-auto">{item.description}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden md:block text-green-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

        
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-4 py-2.5 flex items-center gap-2 border-b border-gray-100">
                <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                <span className="ml-2 text-xs text-gray-400">AgriPulse Dashboard</span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-800">Dashboard</h4>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs bg-white border border-gray-200 rounded-md text-gray-600">Sign In</button>
                    <button className="px-3 py-1.5 text-xs bg-green-600 text-white rounded-md">Get Started</button>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-800">500+</p>
                    <p className="text-xs text-gray-500">Farms Managed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-800">50K+</p>
                    <p className="text-xs text-gray-500">Acres Monitored</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-gray-800">98%</p>
                    <p className="text-xs text-gray-500">Risk Detection Rate</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Field Table</p>
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="text-gray-400">
                            <th className="text-left py-1">Name</th>
                            <th className="text-left py-1">Crop</th>
                            <th className="text-left py-1">Stage</th>
                            <th className="text-left py-1">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: 'North Field', crop: 'Corn', stage: 'Growing', status: 'Active' },
                            { name: 'South Field', crop: 'Wheat', stage: 'Planted', status: 'Active' },
                            { name: 'East Field', crop: 'Soybeans', stage: 'Ready', status: 'At Risk' },
                            { name: 'West Field', crop: 'Barley', stage: 'Growing', status: 'Active' },
                          ].map((f, i) => (
                            <tr key={i} className="border-t border-gray-100">
                              <td className="py-1.5 text-gray-600">{f.name}</td>
                              <td className="py-1.5 text-gray-600">{f.crop}</td>
                              <td className="py-1.5 text-gray-600">{f.stage}</td>
                              <td className="py-1.5">
                                <span className={`px-1.5 py-0.5 rounded text-xs ${
                                  f.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                  {f.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="w-48">
                    <div className="bg-green-50 rounded-lg p-3 mb-3">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Fielding Map</p>
                      <div className="relative h-20 bg-green-100 rounded flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Stats Graph</p>
                      <div className="h-16 flex items-end gap-1">
                        {[40, 65, 45, 80, 55, 70, 60, 85, 50, 75].map((h, i) => (
                          <div key={i} className="flex-1 bg-green-200 rounded-t" style={{ height: `${h}%` }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              Trusted by Farmers
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Users Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section id="pricing" className="py-20 bg-white px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
              Pricing
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Simple, Transparent Pricing
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <h3 className="text-base font-semibold text-gray-800 mb-1">Starter</h3>
              <p className="text-3xl font-bold text-gray-800 mb-1">Free</p>
              <p className="text-xs text-gray-500 mb-4">Clean main costs on consumer trials.</p>
              <button className="w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition font-medium">
                Clean Free
              </button>
            </div>
          
            <div className="relative bg-green-50 rounded-xl border-2 border-green-500 p-6 text-center">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 text-xs font-medium rounded-full">
                Most Popular
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-1 mt-2">Professional</h3>
              <p className="text-3xl font-bold text-gray-800 mb-1">$49<span className="text-base text-gray-500">/month</span></p>
              <p className="text-xs text-gray-500 mb-4">Start wainar progress to manage your agriculture.</p>
              <button className="w-full py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition">
                Start Started
              </button>
            </div>
           
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <h3 className="text-base font-semibold text-gray-800 mb-1">Enterprise</h3>
              <p className="text-3xl font-bold text-gray-800 mb-1">Custom</p>
              <p className="text-xs text-gray-500 mb-4">Custom access and inventries in professional alews.</p>
              <button className="w-full py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition font-medium">
                Gam Custom
              </button>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to Transform Your Farm Management?
            </h2>
            <p className="text-green-100 text-sm mb-6 max-w-lg mx-auto">
              Monitor crop progress, detect risks early and optimize's smart field monitoring platform.
            </p>
            <button className="px-6 py-2.5 bg-white text-green-600 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-all duration-200 shadow-lg flex items-center gap-2 mx-auto">
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

     
      <footer className="bg-white border-t border-gray-100 py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-7 h-7 bg-green-100 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-gray-800">AgriPulse</span>
            </div>
            <p className="text-xs text-gray-400">© 2024 AgriPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
