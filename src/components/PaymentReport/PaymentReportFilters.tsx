// components/PaymentReport/PaymentReportFilters.tsx

import React from 'react';
import { Search, Filter, X, Calendar } from 'lucide-react';
import { PaymentReportFilters } from '@/types/payment-report.types';

interface PaymentReportFiltersProps {
  filters: PaymentReportFilters;
  onFilterChange: (filters: PaymentReportFilters) => void;
  onApply: () => void;
  onReset: () => void;
  showReset: boolean;
  classes: Array<{ id: number; name: string }>;
  academicYears: Array<{ id: number; name: string }>;
}

export const PaymentReportFilters: React.FC<PaymentReportFiltersProps> = ({
  filters,
  onFilterChange,
  onApply,
  onReset,
  showReset,
  classes,
  academicYears,
}) => {
  const paymentMethods = [
    { value: 'ALL', label: 'All Methods' },
    { value: 'CASH', label: 'Cash' },
    { value: 'ONLINE', label: 'Online' },
    { value: 'UPI', label: 'UPI' },
    { value: 'CARD', label: 'Card' },
    { value: 'BANK_TRANSFER', label: 'Bank Transfer' },
  ];

  const statusOptions = [
    { value: 'ALL', label: 'All Status' },
    { value: 'SUCCESS', label: 'Success' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'FAILED', label: 'Failed' },
  ];

  const handleInputChange = (
    key: keyof PaymentReportFilters,
    value: string | number
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by receipt no., student..."
            value={filters.search || ''}
            onChange={(e) => handleInputChange('search', e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
          />
        </div>

        {/* Class Filter */}
        <div className="min-w-[150px]">
          <select
            value={filters.classId || ''}
            onChange={(e) =>
              handleInputChange('classId', e.target.value ? parseInt(e.target.value) : undefined)
            }
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white"
          >
            <option value="">All Classes</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>

        {/* Academic Year */}
        <div className="min-w-[150px]">
          <select
            value={filters.academicYearId || ''}
            onChange={(e) =>
              handleInputChange('academicYearId', e.target.value ? parseInt(e.target.value) : undefined)
            }
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white"
          >
            <option value="">All Years</option>
            {academicYears.map((year) => (
              <option key={year.id} value={year.id}>
                {year.name}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Method */}
        <div className="min-w-[140px]">
          <select
            value={filters.paymentMethod || 'ALL'}
            onChange={(e) =>
              handleInputChange('paymentMethod', e.target.value as any)
            }
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white"
          >
            {paymentMethods.map((method) => (
              <option key={method.value} value={method.value}>
                {method.label}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div className="min-w-[130px]">
          <select
            value={filters.status || 'ALL'}
            onChange={(e) =>
              handleInputChange('status', e.target.value as any)
            }
            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm bg-white"
          >
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range */}
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={filters.startDate || ''}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
          />
          <span className="text-gray-400 text-sm">to</span>
          <input
            type="date"
            value={filters.endDate || ''}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            className="px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
          />
        </div>

        {/* Apply Button */}
        <button
          onClick={onApply}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Filter className="w-4 h-4" />
          Apply
        </button>

        {/* Reset Button */}
        {showReset && (
          <button
            onClick={onReset}
            className="px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-sm font-medium flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
};