import { CheckCircle } from "lucide-react";
import { steps } from "../utils/formUtils";

export default function StepProgress({ currentStep, onStepClick }) {
  return (
    <div className="mb-8 overflow-x-auto">
      <div className="flex items-center justify-between min-w-max">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <div key={step.id} className="flex items-center">
              <button
                type="button"
                onClick={() => onStepClick(step.id)}
                className="relative focus:outline-none"
                disabled={step.id > currentStep}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  currentStep >= step.id
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-gray-300 bg-white text-gray-400'
                } ${step.id < currentStep ? 'cursor-pointer hover:border-indigo-400' : ''}`}>
                  {currentStep > step.id ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <StepIcon className="w-5 h-5" />
                  )}
                </div>
              </button>
              {index < steps.length - 1 && (
                <div className={`w-16 h-1 mx-2 transition-colors ${
                  currentStep > step.id ? 'bg-indigo-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-2 text-xs">
        {steps.map((step) => (
          <span key={step.id} className={`${currentStep >= step.id ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
            {step.name}
          </span>
        ))}
      </div>
    </div>
  );
}