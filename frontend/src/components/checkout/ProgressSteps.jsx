import React from 'react';
import { FiCheck } from 'react-icons/fi';

const ProgressSteps = ({ currentStep, steps }) => {
    return (
        <div className="mb-8">
            <div className="flex justify-between items-center">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center flex-1">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${currentStep >= step.id
                                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                                        : 'bg-gray-700 text-gray-400'
                                    }`}
                            >
                                {currentStep > step.id ? <FiCheck /> : step.id}
                            </div>
                            <span
                                className={`mt-2 text-sm ${currentStep >= step.id ? 'text-white' : 'text-gray-500'
                                    }`}
                            >
                                {step.name}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`h-1 flex-1 mx-4 transition-all ${currentStep > step.id
                                        ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                                        : 'bg-gray-700'
                                    }`}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default ProgressSteps;
