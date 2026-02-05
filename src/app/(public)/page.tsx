import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-white">

      {/* HERO SECTION */}
      <section className="text-center py-20 px-4 bg-gradient-to-br from-green-50 to-white overflow-x-hidden">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
          Smart School Management <br />
          <span className="text-green-600">Made Simple</span>
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          EduManage Pro helps schools manage students, teachers, attendance,
          exams, fees, and reports — all in one powerful platform.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            href="/register"
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Start Free Trial
          </Link>
          <Link
            href="/demo"
            className="border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Book Demo
          </Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything Your School Needs
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <div
              key={i}
              className="p-6 border rounded-xl shadow-sm hover:shadow-lg transition"
            >
              <div className="text-green-600 text-3xl mb-4">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="bg-green-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 text-center gap-10">
          <div>
            <h3 className="text-4xl font-bold">500+</h3>
            <p className="mt-2">Schools Using Our Platform</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">50K+</h3>
            <p className="mt-2">Students Managed</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">99.9%</h3>
            <p className="mt-2">System Uptime</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 text-center px-4">
        <h2 className="text-3xl font-bold">
          Ready to Transform Your School Management?
        </h2>
        <p className="mt-4 text-gray-600">
          Join hundreds of schools already using EduManage Pro.
        </p>
        <Link
          href="/register"
          className="mt-6 inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
        >
          Get Started Now
        </Link>
      </section>
    </main>
  );
}

const features = [
  {
    icon: "🎓",
    title: "Student Management",
    desc: "Manage student records, admissions, attendance and performance.",
  },
  {
    icon: "👩‍🏫",
    title: "Teacher & Staff",
    desc: "Handle teacher data, payroll, and staff attendance easily.",
  },
  {
    icon: "💳",
    title: "Fees & Payments",
    desc: "Track fee collection, invoices and payment history.",
  },
  {
    icon: "📝",
    title: "Exams & Results",
    desc: "Create exams, grade students, and generate report cards.",
  },
  {
    icon: "📊",
    title: "Reports & Analytics",
    desc: "Detailed insights and performance tracking dashboards.",
  },
  {
    icon: "🔐",
    title: "Secure & Cloud Based",
    desc: "Your school data is safe with cloud security.",
  },
];
