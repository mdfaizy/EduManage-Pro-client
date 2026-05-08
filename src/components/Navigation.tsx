import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";

export default function FormNavigation({ currentStep, totalSteps, showPreview, loading, onPrevious, onNext }) {
  return (
    <div className="flex justify-between mt-8 pt-4 border-t">
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentStep === 1 && !showPreview}
        className="flex items-center space-x-2 px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{showPreview ? 'Back to Form' : 'Previous'}</span>
      </button>
      
      {showPreview ? (
        <button
          type="submit"
          disabled={loading}
          className="flex items-center space-x-2 px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting...</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Confirm & Submit</span>
            </>
          )}
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="flex items-center space-x-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <span>{currentStep === totalSteps ? 'Review Application' : 'Next'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}