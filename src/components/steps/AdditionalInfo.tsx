import { steps } from "@/utils/formUtils";

export default function AdditionalInfoStep({ form, handleChange }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
        <span className="text-sm text-gray-500">Step 6 of {steps.length}</span>
      </div>
      <p className="text-sm text-gray-500">{steps[4].description}</p>
      
      <div className="border rounded-lg p-4">
        <h4 className="font-medium text-gray-800 mb-3">Facilities Required</h4>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
            <input type="checkbox" name="transportRequired" checked={form.transportRequired} onChange={handleChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
            <div>
              <span className="text-sm font-medium text-gray-700">Transport Facility Required</span>
              <p className="text-xs text-gray-500">School bus/van service</p>
            </div>
          </label>
          
          <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
            <input type="checkbox" name="hostelRequired" checked={form.hostelRequired} onChange={handleChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
            <div>
              <span className="text-sm font-medium text-gray-700">Hostel Accommodation Required</span>
              <p className="text-xs text-gray-500">Boys/Girls hostel facility</p>
            </div>
          </label>
          
          <label className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
            <input type="checkbox" name="sportsQuota" checked={form.sportsQuota} onChange={handleChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
            <div>
              <span className="text-sm font-medium text-gray-700">Sports Quota</span>
              <p className="text-xs text-gray-500">Admission under sports category</p>
            </div>
          </label>
          
          {form.sportsQuota && (
            <div className="ml-8 mt-2">
              <label className="block text-sm text-gray-600 mb-1">Sports Achievements</label>
              <textarea name="sportsDetails" value={form.sportsDetails} onChange={handleChange} rows={3}
                placeholder="Please specify sports achievements, certificates, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          )}
        </div>
      </div>

      <div className="border rounded-lg p-4">
        <h4 className="font-medium text-gray-800 mb-3">Medical Information</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Any Medical Conditions</label>
            <textarea name="medicalConditions" value={form.medicalConditions} onChange={handleChange} rows={3}
              placeholder="Please list any medical conditions, allergies, or health concerns (if none, write 'None')"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <p className="text-xs text-gray-500 mt-1">This information helps us provide better care</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Allergies (if any)</label>
            <textarea name="allergies" value={form.allergies} onChange={handleChange} rows={2}
              placeholder="Please list any food or medical allergies"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
      </div>
    </div>
  );
}