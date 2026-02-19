import React from 'react';
import ResourceForm from '../components/ResourceForm';
import { Package } from 'lucide-react';

const RequestResource = () => {
    const handleSubmit = (formData) => {
        console.log('Resource Request Submitted:', formData);
        // API call would go here
        alert('Resource request submitted! (Mock)');
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="bg-card backdrop-blur-md shadow-lg rounded-2xl overflow-hidden border-2 border-primary/10">
                {/* Header */}
                <div className="px-6 py-6 bg-gradient-to-r from-primary to-primary-dark border-b-2 border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                            <Package className="text-white" size={28} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white">Request Resource</h3>
                            <p className="text-white/80 text-sm mt-1">Need equipment or facilities? Submit your request here.</p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="px-6 py-8">
                    <ResourceForm onSubmit={handleSubmit} />
                </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-primary/5 backdrop-blur-sm border-2 border-primary/20 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-primary mb-2">📋 Request Guidelines</h4>
                <ul className="text-sm text-primary/80 space-y-1">
                    <li>• Be specific about what you need and when</li>
                    <li>• Include supporting documents if available</li>
                    <li>• Requests are typically reviewed within 24-48 hours</li>
                </ul>
            </div>
        </div>
    );
};

export default RequestResource;
