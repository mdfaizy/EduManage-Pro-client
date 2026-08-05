"use client";

import {
  Wallet,
  TrendingUp,
  AlertCircle,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Download,
  RefreshCw,
  FileText,
  Users,
  CreditCard,
  ChevronRight,
  Printer,
} from "lucide-react";

// =====================================================
// TYPES & CONFIG
// =====================================================

interface QuickReport {
  title: string;
  description: string;
  icon: typeof FileText;
}

const QUICK_REPORTS: QuickReport[] = [
  { title: "Collection Report", description: "View fee collection summary", icon: FileText },
  { title: "Pending Fee Report", description: "View all pending fees", icon: Clock },
  { title: "Overdue Report", description: "View overdue fee details", icon: AlertCircle },
  { title: "Class Wise Report", description: "Collection by class report", icon: Users },
  { title: "Daily Collection", description: "Today's collection summary", icon: Calendar },
  { title: "Monthly Collection", description: "Monthly collection trends", icon: BarChart3 },
  { title: "Student Ledger", description: "Individual student ledger", icon: CreditCard },
  { title: "Payment History", description: "All payment transactions", icon: Wallet },
];

const CHART_DATA = [
  { month: "Jan", thisMonth: 180, lastMonth: 120 },
  { month: "Feb", thisMonth: 220, lastMonth: 160 },
  { month: "Mar", thisMonth: 200, lastMonth: 180 },
  { month: "Apr", thisMonth: 250, lastMonth: 200 },
  { month: "May", thisMonth: 280, lastMonth: 220 },
  { month: "Jun", thisMonth: 300, lastMonth: 250 },
];

const PAYMENT_METHODS = [
  { name: "Cash", percentage: 51, color: "#2563eb" },
  { name: "UPI", percentage: 32, color: "#059669" },
  { name: "Card", percentage: 12, color: "#d97706" },
  { name: "Net Banking", percentage: 5, color: "#7c3aed" },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

export default function ReportsDashboard() {
  const stats = {
    totalCollection: 245600,
    totalDue: 125400,
    collectionRate: 66.27,
    totalStudents: 1234,
    newStudents: 12,
    monthlyGrowth: 15.2,
    dueChange: -8.5,
    rateChange: 7.3,
  };

  const maxValue = Math.max(...CHART_DATA.flatMap((d) => [d.thisMonth, d.lastMonth]));

  // Precompute donut chart segments (offset accumulates)
  let cumulative = 0;
  const donutSegments = PAYMENT_METHODS.map((method) => {
    const offset = cumulative;
    cumulative += method.percentage;
    return { ...method, offset };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-gray-200">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Reports Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Overview of fee collection and financial reports</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3.5 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <Download size={15} />
              Export
            </button>
            <button className="flex items-center gap-2 px-3.5 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <Printer size={15} />
              Print
            </button>
            <button className="flex items-center gap-2 px-3.5 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <RefreshCw size={15} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon={Wallet}
            label="Total Collection"
            value={formatCurrency(stats.totalCollection)}
            change={stats.monthlyGrowth}
            changeLabel="from last month"
          />
          <StatCard
            icon={AlertCircle}
            label="Total Due"
            value={formatCurrency(stats.totalDue)}
            valueClass="text-red-600"
            change={stats.dueChange}
            changeLabel="from last month"
            positiveIsGood={false}
          />
          <StatCard
            icon={TrendingUp}
            label="Collection Rate"
            value={`${stats.collectionRate}%`}
            change={stats.rateChange}
            changeLabel="from last month"
          />
          <StatCard
            icon={Users}
            label="Total Students"
            value={String(stats.totalStudents)}
            change={stats.newStudents}
            changeLabel="new this month"
            isCount
          />
        </div>

        {/* Quick Reports Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Quick Reports</h2>
            <button className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1">
              View All
              <ChevronRight size={15} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {QUICK_REPORTS.map((report) => (
              <button
                key={report.title}
                className="bg-white rounded-[10px] border border-gray-200 p-4 text-left hover:border-gray-300 transition group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gray-100 border border-gray-200">
                    <report.icon size={17} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900">{report.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{report.description}</p>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-gray-300 group-hover:text-gray-500 transition mt-0.5"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Collection Chart */}
          <div className="lg:col-span-2 bg-white rounded-[10px] border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-gray-900">Collection Chart</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 bg-gray-900 rounded-full" />
                  <span className="text-xs text-gray-500">This Month</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 bg-gray-300 rounded-full" />
                  <span className="text-xs text-gray-500">Last Month</span>
                </div>
              </div>
            </div>

            {/* Chart Bars */}
            <div className="h-56 flex items-end gap-3">
              {CHART_DATA.map((data) => {
                const thisHeight = (data.thisMonth / maxValue) * 100;
                const lastHeight = (data.lastMonth / maxValue) * 100;

                return (
                  <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex justify-center gap-1.5 h-48 items-end">
                      <div className="relative group/bar">
                        <div
                          className="w-5 bg-gray-900 rounded-t transition-all hover:bg-gray-700 cursor-pointer"
                          style={{ height: `${(thisHeight / 100) * 192}px` }}
                        />
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition bg-gray-900 text-white text-[11px] px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none">
                          {data.thisMonth}
                        </div>
                      </div>
                      <div className="relative group/bar">
                        <div
                          className="w-5 bg-gray-300 rounded-t transition-all hover:bg-gray-400 cursor-pointer"
                          style={{ height: `${(lastHeight / 100) * 192}px` }}
                        />
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition bg-gray-900 text-white text-[11px] px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none">
                          {data.lastMonth}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-[10px] border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Collection By Payment Method</h3>

            {/* Donut Chart */}
            <div className="relative w-44 h-44 mx-auto mb-5">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {donutSegments.map((seg) => (
                  <circle
                    key={seg.name}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="12"
                    strokeDasharray={`${seg.percentage * 2.51} ${100 * 2.51 - seg.percentage * 2.51}`}
                    strokeDashoffset={`-${seg.offset * 2.51}`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-sm font-semibold text-gray-900">{formatCurrency(stats.totalCollection)}</p>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              {PAYMENT_METHODS.map((method) => (
                <div key={method.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: method.color }}
                    />
                    <span className="text-sm text-gray-700">{method.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{method.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// STAT CARD (sub-component)
// =====================================================

function StatCard({
  icon: Icon,
  label,
  value,
  valueClass = "text-gray-900",
  change,
  changeLabel,
  positiveIsGood = true,
  isCount = false,
}: {
  icon: typeof Wallet;
  label: string;
  value: string;
  valueClass?: string;
  change: number;
  changeLabel: string;
  positiveIsGood?: boolean;
  isCount?: boolean;
}) {
  const isPositive = change >= 0;
  const isGood = positiveIsGood ? isPositive : !isPositive;
  const ChangeIcon = isPositive ? ArrowUpRight : ArrowDownRight;

  return (
    <div className="bg-white rounded-[10px] border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg border border-gray-200">
            <Icon size={18} className="text-gray-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
            <p className={`text-xl font-semibold mt-1 ${valueClass}`}>{value}</p>
          </div>
        </div>
        {!isCount && (
          <div
            className={`flex items-center gap-0.5 px-2 py-1 rounded-full text-xs font-medium ${
              isGood ? "text-emerald-700 bg-emerald-50" : "text-red-700 bg-red-50"
            }`}
          >
            <ChangeIcon size={13} />
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <p className="text-xs text-gray-400 mt-2">
        {isCount ? `+${change} ` : `${change >= 0 ? "+" : ""}${change}% `}
        {changeLabel}
      </p>
    </div>
  );
}