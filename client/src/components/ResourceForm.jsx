import React, { useState } from 'react';
import { Upload, Package } from 'lucide-react';

const ResourceForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        resourceName: '',
        description: '',
        quantity: 1,
        file: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, file: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        // Reset form
        setFormData({ resourceName: '', description: '', quantity: 1, file: null });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Package className="inline mr-2" size={16} />
                    Resource Name *
                </label>
                <input
                    type="text"
                    name="resourceName"
                    value={formData.resourceName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50/50 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-700 placeholder-gray-400 transition-all font-medium"
                    placeholder="e.g., Projector for Presentation"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description *
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/80 border-2 border-blue-300/50 rounded-lg focus:outline-none focus:border-blue-400 text-gray-900 placeholder-gray-500 transition-colors resize-none"
                    placeholder="Describe what you need and why..."
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity
                </label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 bg-white/80 border-2 border-blue-300/50 rounded-lg focus:outline-none focus:border-blue-400 text-gray-900 transition-colors"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Upload className="inline mr-2" size={16} />
                    Supporting Document (Optional)
                </label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 bg-gray-50/50 border-gray-200 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-btn file:border-0 file:text-sm file:font-semibold file:bg-primary/5 file:text-primary hover:file:bg-primary/10 cursor-pointer transition-all"
                />
            </div>

            <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-btn shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
                Submit Resource Request
            </button>
        </form>
    );
};

export default ResourceForm;
