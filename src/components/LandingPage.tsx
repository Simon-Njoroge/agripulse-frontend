import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  BarChart3, 
  Users, 
  Clock, 
  Activity,
  Lock,
  Star,
  Quote,
  Leaf,
  Tractor,
  Bell,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from 'lucide-react';


interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface TestimonialCardProps {
  name: string;
  role: string;
  farm: string;
  content: string;
  rating: number;
}

interface PricingCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}


const stats: StatCardProps[] = [
  { value: '500+', label: 'Farms Managed', icon: <Tractor className="w-5 h-5" /> },
  { value: '50K+', label: 'Acres Monitored', icon: <Leaf className="w-5 h-5" /> },
  { value: '98%', label: 'Risk Detection Rate', icon: <Bell className="w-5 h-5" /> },
  { value: '24/7', label: 'Real-time Updates', icon: <Activity className="w-5 h-5" /> },
];

const features: FeatureCardProps[] = [
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: 'Smart Dashboard',
    description: 'Real-time overview of all fields with status breakdown and key metrics.',
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: 'Risk Detection',
    description: 'Automatic alerts when fields need attention or are falling behind schedule.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Team Management',
    description: 'Assign fields to agents and track their performance over time.',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Activity Timeline',
    description: 'Complete history of all updates with notes and stage changes.',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Performance Analytics',
    description: 'Agent performance scores, completion rates, and activity tracking.',
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: 'Secure Access',
    description: 'Role-based access control with enterprise-grade security.',
  },
];

const testimonials: TestimonialCardProps[] = [
  {
    name: 'David Mwangi',
    role: 'Farm Manager',
    farm: 'Green Valley Farms',
    content: 'AgriPulse has transformed how we monitor crop progress. The risk detection alerts have saved us from potential losses multiple times.',
    rating: 5,
  },
  {
    name: 'Sarah Kimani',
    role: 'Head Agronomist',
    farm: 'Sunrise Agricultural Co.',
    content: 'The real-time updates from field agents and the analytics dashboard give us complete visibility across all our fields.',
    rating: 5,
  },
  {
    name: 'James Otieno',
    role: 'Farm Owner',
    farm: 'Otieno Family Farms',
    content: 'Simple to use, powerful insights. My team adapted quickly and our harvest planning has never been better.',
    rating: 5,
  },
];

const pricingPlans: PricingCardProps[] = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for small farms getting started',
    features: ['Up to 5 fields', 'Basic analytics', 'Email support', 'Single agent access'],
    buttonText: 'Get Started',
  },
  {
    name: 'Professional',
    price: '$49',
    description: 'For growing farm operations',
    features: ['Up to 50 fields', 'Advanced analytics', 'Priority support', 'Multi-agent access', 'Risk alerts', 'Performance tracking'],
    isPopular: true,
    buttonText: 'Start Free Trial',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large agricultural operations',
    features: ['Unlimited fields', 'Custom analytics', 'Dedicated support', 'Unlimited agents', 'API access', 'SLA agreement'],
    buttonText: 'Contact Sales',
  },
];



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Features', 'How It Works', 'Pricing', 'Contact'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
      
        <div className="flex items-center space-x-2">
          <Leaf className="w-7 h-7 text-green-600" />
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
            AgriPulse
          </span>
        </div>

       
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-gray-600 hover:text-green-600 transition-colors duration-200 font-medium"
            >
              {link}
            </a>
          ))}
        </div>

      
        <div className="hidden md:flex items-center space-x-4">
          <button className="px-5 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-all duration-200 font-medium">
            Sign In
          </button>
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium">
            Get Started
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
            <button className="w-full px-5 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition">
              Sign In
            </button>
            <button className="w-full px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const StatCard: React.FC<StatCardProps> = ({ value, label, icon }) => (
  <div className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
    <div className="text-green-600 mb-2 flex justify-center">{icon}</div>
    <div className="text-3xl md:text-4xl font-bold text-gray-800">{value}</div>
    <div className="text-gray-500 mt-1">{label}</div>
  </div>
);

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100">
    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{description}</p>
  </div>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, farm, content, rating }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
    <Quote className="w-8 h-8 text-green-200 mb-4" />
    <p className="text-gray-600 leading-relaxed mb-4">{content}</p>
    <div className="flex items-center mb-3">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <div>
      <p className="font-semibold text-gray-800">{name}</p>
      <p className="text-sm text-gray-500">{role}, {farm}</p>
    </div>
  </div>
);

const PricingCard: React.FC<PricingCardProps> = ({ name, price, description, features, isPopular, buttonText }) => (
  <div className={`relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
    isPopular ? 'border-2 border-green-500 transform md:-translate-y-4' : 'border border-gray-200'
  }`}>
    {isPopular && (
      <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
        Most Popular
      </div>
    )}
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold text-gray-800">{price}</span>
        {price !== 'Custom' && price !== 'Free' && (
          <span className="text-gray-500">/month</span>
        )}
      </div>
      <p className="text-gray-500 text-sm mb-6">{description}</p>
      <ul className="space-y-3 mb-6">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-2 rounded-lg font-medium transition-all duration-200 ${
        isPopular
          ? 'bg-green-600 text-white hover:bg-green-700 shadow-md'
          : 'border border-green-600 text-green-600 hover:bg-green-50'
      }`}>
        {buttonText}
      </button>
    </div>
  </div>
);

const SectionBadge: React.FC<{ text: string }> = ({ text }) => (
  <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
    {text}
  </div>
);


const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-white">
      <Navbar />

     
      <section className="pt-32 pb-20 px-4 md:px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6 animate-fade-in">
              Smart Farming Intelligence
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 animate-slide-up">
              Track Your Fields with{' '}
              <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                Intelligent Insights
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 animate-slide-up animation-delay-100">
              Monitor crop progress, detect risks early, and optimize your harvest with AgriPulse's
              smart field monitoring platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-200">
              <button className="px-8 py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <button className="px-8 py-3 border border-gray-300 rounded-lg text-lg font-semibold hover:border-green-600 hover:text-green-600 transition-all duration-200">
                Watch Demo
              </button>
            </div>
          </div>

         
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-green-500/10 to-transparent rounded-2xl"></div>
            <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="bg-gray-800 px-4 py-3 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="ml-4 text-gray-400 text-sm">AgriPulse Dashboard</div>
              </div>
              <div className="bg-gray-50 p-4 md:p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {['Total Fields', 'Active', 'At Risk', 'Completed'].map((label, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-gray-500 text-sm">{label}</p>
                      <p className="text-2xl font-bold text-gray-800">{['45', '28', '8', '9'][i]}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold text-gray-800">Recent Fields</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">Field Name</th>
                          <th className="px-4 py-2 text-left">Crop</th>
                          <th className="px-4 py-2 text-left">Stage</th>
                          <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'North Field', crop: 'Corn', stage: 'Growing', status: 'Active' },
                          { name: 'South Field', crop: 'Wheat', stage: 'Planted', status: 'Active' },
                          { name: 'East Field', crop: 'Soybeans', stage: 'Ready', status: 'At Risk' },
                        ].map((field, i) => (
                          <tr key={i} className="border-t">
                            <td className="px-4 py-2">{field.name}</td>
                            <td className="px-4 py-2">{field.crop}</td>
                            <td className="px-4 py-2">{field.stage}</td>
                            <td className="px-4 py-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                field.status === 'Active' ? 'bg-green-100 text-green-700' :
                                field.status === 'At Risk' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'
                              }`}>
                                {field.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

     
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>
        </div>
      </section>

     
      <section id="features" className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionBadge text="Why Choose AgriPulse" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Everything You Need to Manage Your Fields
            </h2>
            <p className="text-gray-500">
              From planting to harvest, AgriPulse gives you complete visibility and control over your farming operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </div>
        </div>
      </section>

      
      <section id="how-it-works" className="py-20 bg-gray-50 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionBadge text="Simple Setup" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              How AgriPulse Works
            </h2>
            <p className="text-gray-500">
              Get started in minutes with our simple three-step process
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Add Your Fields', description: 'Create fields with crop type, planting date, and assign to agents.', icon: <Tractor className="w-8 h-8" /> },
              { step: '02', title: 'Track Progress', description: 'Agents update stages and add notes as crops grow.', icon: <Activity className="w-8 h-8" /> },
              { step: '03', title: 'Get Insights', description: 'Monitor risks, track performance, and optimize harvest.', icon: <TrendingUp className="w-8 h-8" /> },
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mx-auto group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionBadge text="Trusted by Farmers" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Users Say
            </h2>
            <p className="text-gray-500">
              Join hundreds of satisfied farmers using AgriPulse
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard key={idx} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-gray-50 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <SectionBadge text="Pricing" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-500">
              Choose the plan that works best for your farm
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, idx) => (
              <PricingCard key={idx} {...plan} />
            ))}
          </div>
        </div>
      </section>

     
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Farm Management?
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers already using AgriPulse to optimize their harvest and reduce risks.
            </p>
            <button className="px-8 py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl">
              Get Started Free →
            </button>
          </div>
        </div>
      </section>

   
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="w-6 h-6 text-green-500" />
                <span className="text-xl font-bold text-white">AgriPulse</span>
              </div>
              <p className="text-sm leading-relaxed">
                Intelligent field monitoring for modern agriculture. Helping farmers optimize harvest and reduce risks.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Blog</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>© 2024 AgriPulse. All rights reserved.</p>
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
      `}</style>
    </div>
  );
};

export default LandingPage;