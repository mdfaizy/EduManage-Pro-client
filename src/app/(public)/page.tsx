// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <main className="bg-white">

//       {/* HERO SECTION */}
//       <section className="text-center py-20 px-4 bg-gradient-to-br from-green-50 to-white overflow-x-hidden">
//         <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
//           Smart School Management <br />
//           <span className="text-green-600">Made Simple</span>
//         </h1>
//         <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
//           EduManage Pro helps schools manage students, teachers, attendance,
//           exams, fees, and reports — all in one powerful platform.
//         </p>

//         <div className="mt-8 flex justify-center gap-4 flex-wrap">
//           <Link
//             href="/register"
//             className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
//           >
//             Start Free Trial
//           </Link>
//           <Link
//             href="/demo"
//             className="border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
//           >
//             Book Demo
//           </Link>
//         </div>
//       </section>

//       {/* FEATURES SECTION */}
//       <section className="py-20 px-4 max-w-7xl mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           Everything Your School Needs
//         </h2>

//         <div className="grid md:grid-cols-3 gap-10">
//           {features.map((item, i) => (
//             <div
//               key={i}
//               className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition"
//             >
//               <div className="text-green-600 text-3xl mb-4">{item.icon}</div>
//               <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
//               <p className="text-gray-600">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* STATS SECTION */}
//       <section className="bg-green-600 text-white py-16 px-4">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-10">
//           <div>
//             <h3 className="text-4xl font-bold">500+</h3>
//             <p className="mt-2">Schools Using Our Platform</p>
//           </div>
//           <div>
//             <h3 className="text-4xl font-bold">50K+</h3>
//             <p className="mt-2">Students Managed</p>
//           </div>
//           <div>
//             <h3 className="text-4xl font-bold">99.9%</h3>
//             <p className="mt-2">System Uptime</p>
//           </div>
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="py-20 text-center px-4">
//         <h2 className="text-3xl font-bold">
//           Ready to Transform Your School Management?
//         </h2>
//         <p className="mt-4 text-gray-600">
//           Join hundreds of schools already using EduManage Pro.
//         </p>
//         <Link
//           href="/register"
//           className="mt-6 inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
//         >
//           Get Started Now
//         </Link>
//       </section>
//     </main>
//   );
// }

// const features = [
//   {
//     icon: "🎓",
//     title: "Student Management",
//     desc: "Manage student records, admissions, attendance and performance.",
//   },
//   {
//     icon: "👩‍🏫",
//     title: "Teacher & Staff",
//     desc: "Handle teacher data, payroll, and staff attendance easily.",
//   },
//   {
//     icon: "💳",
//     title: "Fees & Payments",
//     desc: "Track fee collection, invoices and payment history.",
//   },
//   {
//     icon: "📝",
//     title: "Exams & Results",
//     desc: "Create exams, grade students, and generate report cards.",
//   },
//   {
//     icon: "📊",
//     title: "Reports & Analytics",
//     desc: "Detailed insights and performance tracking dashboards.",
//   },
//   {
//     icon: "🔐",
//     title: "Secure & Cloud Based",
//     desc: "Your school data is safe with cloud security.",
//   },
// ];



import Link from "next/link";
import { ArrowRight, Check, Star, Users, Shield, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* NAVIGATION */}
      {/* <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="font-bold text-xl text-gray-900">EduManage Pro</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition">
                Features
              </Link>
              <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition">
                Testimonials
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav> */}

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-32 px-4 bg-gradient-to-br from-green-50 via-white to-blue-50 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-0 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                Trusted by 500+ Schools Worldwide
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
                Smart School Management{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  Made Simple
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transform your school operations with our all-in-one platform. 
                Manage students, teachers, attendance, exams, and fees effortlessly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/register"
                  className="group bg-green-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-green-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Start Free 30-Day Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  href="/demo"
                  className="border-2 border-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
                >
                  Watch Demo
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>14-day money back guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-600" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-200">
                <div className="flex gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                
                {/* Mock Dashboard */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <span className="font-semibold text-gray-700">Dashboard Overview</span>
                    <div className="flex gap-2">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-100"></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Total Students", value: "2,456", color: "blue" },
                      { label: "Active Teachers", value: "124", color: "green" },
                      { label: "Attendance Today", value: "94%", color: "purple" },
                      { label: "Revenue This Month", value: "$45K", color: "orange" },
                    ].map((stat, i) => (
                      <div key={i} className={`bg-${stat.color}-50 p-4 rounded-xl`}>
                        <div className="text-sm text-gray-600 mb-1">{stat.label}</div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
                    <div className="text-sm opacity-90 mb-1">Quick Actions</div>
                    <div className="font-semibold mb-4">What would you like to do?</div>
                    <div className="grid grid-cols-2 gap-2">
                      {["Add Student", "Mark Attendance", "Generate Report", "Send Notice"].map((action, i) => (
                        <div key={i} className="bg-white/20 backdrop-blur-sm rounded-lg p-2 text-sm text-center">
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Active Users</div>
                    <div className="font-bold text-gray-900">1,245</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-blue-600 fill-current" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Rating</div>
                    <div className="font-bold text-gray-900">4.9/5.0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500 text-sm mb-8">TRUSTED BY LEADING EDUCATIONAL INSTITUTIONS</p>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
            {["School A", "School B", "School C", "School D", "School E"].map((school, i) => (
              <div key={i} className="text-2xl font-bold text-gray-400">{school}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything Your School Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A comprehensive suite of tools designed to streamline every aspect of school management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <div
                key={i}
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition border border-gray-100 hover:border-green-200"
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition">{item.icon}</div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-4">{item.desc}</p>
                <Link href="#" className="text-green-600 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition">
                  Learn more 
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-green-600 via-green-700 to-blue-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Schools Using Our Platform", icon: "🏫" },
              { number: "50K+", label: "Students Managed Daily", icon: "🎓" },
              { number: "99.9%", label: "System Uptime Guaranteed", icon: "⚡" },
              { number: "24/7", label: "Customer Support", icon: "💬" },
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition">{stat.icon}</div>
                <h3 className="text-5xl md:text-6xl font-bold mb-2">{stat.number}</h3>
                <p className="text-green-100 text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Loved by Schools Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what educators are saying about EduManage Pro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-green-200 transition">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-600">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that fits your school's needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <div
                key={i}
                className={`bg-white p-8 rounded-2xl border-2 ${
                  plan.popular ? 'border-green-500 shadow-xl scale-105' : 'border-gray-200'
                } relative`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    ${plan.price}
                    <span className="text-lg text-gray-500">/month</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register"
                  className={`block text-center py-3 px-6 rounded-xl font-semibold transition ${
                    plan.popular
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-4 bg-gradient-to-br from-green-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your School Management?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join hundreds of schools already using EduManage Pro to streamline their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg inline-flex items-center justify-center gap-2"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition inline-flex items-center justify-center gap-2"
            >
              Talk to Sales
            </Link>
          </div>
          <p className="mt-6 text-green-100 text-sm">
            No credit card required • 30-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="font-bold text-xl text-white">EduManage Pro</span>
              </div>
              <p className="text-gray-400 mb-4">
                Transforming school management with innovative technology solutions.
              </p>
              <div className="flex gap-4">
                {["twitter", "linkedin", "facebook", "instagram"].map(social => (
                  <a key={social} href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition">
                    <span className="sr-only">{social}</span>
                    •
                  </a>
                ))}
              </div>
            </div>

            {footerLinks.map((section, i) => (
              <div key={i}>
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, li) => (
                    <li key={li}>
                      <Link href="#" className="text-gray-400 hover:text-white transition">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 EduManage Pro. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-white transition">Privacy Policy</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">Terms of Service</Link>
              <Link href="#" className="text-gray-400 hover:text-white transition">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

const features = [
  {
    icon: "🎓",
    title: "Student Management",
    desc: "Complete student lifecycle management from admission to graduation. Track records, performance, and attendance in real-time.",
  },
  {
    icon: "👩‍🏫",
    title: "Teacher & Staff Portal",
    desc: "Streamline teacher management, payroll processing, and staff attendance with automated workflows.",
  },
  {
    icon: "💳",
    title: "Fees & Payments",
    desc: "Automated fee collection, invoice generation, and payment tracking with multiple payment gateway integration.",
  },
  {
    icon: "📝",
    title: "Exams & Results",
    desc: "Create exams, automate grading, generate report cards, and share results with parents instantly.",
  },
  {
    icon: "📊",
    title: "Reports & Analytics",
    desc: "Powerful dashboards with detailed insights, performance metrics, and predictive analytics for data-driven decisions.",
  },
  {
    icon: "🔐",
    title: "Secure & Cloud Based",
    desc: "Enterprise-grade security with encrypted data storage, regular backups, and 99.9% uptime guarantee.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Principal, Greenwood High School",
    quote: "EduManage Pro has completely transformed how we operate. Tasks that used to take hours now take minutes. Highly recommended!",
  },
  {
    name: "Michael Chen",
    role: "Administrator, Tech Valley Academy",
    quote: "The best investment we've made for our school. The analytics help us make better decisions and the support team is outstanding.",
  },
  {
    name: "Priya Sharma",
    role: "Director, Sunshine International",
    quote: "From attendance to fee management, everything is seamless. Our teachers and parents love the mobile app too!",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: 99,
    description: "Perfect for small schools",
    features: [
      "Up to 200 students",
      "5 admin users",
      "Basic reports",
      "Email support",
      "Mobile app access",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: 299,
    description: "For growing institutions",
    features: [
      "Up to 1000 students",
      "15 admin users",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "Parent portal",
      "SMS notifications",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 599,
    description: "For large schools",
    features: [
      "Unlimited students",
      "Unlimited users",
      "Custom reports",
      "24/7 phone support",
      "Dedicated manager",
      "API access",
      "White-label option",
      "Custom training",
    ],
    popular: false,
  },
];

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Pricing", "Security", "Roadmap", "API"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers", "Press Kit", "Contact"],
  },
  {
    title: "Resources",
    links: ["Documentation", "Help Center", "Community", "Webinars", "Status"],
  },
];