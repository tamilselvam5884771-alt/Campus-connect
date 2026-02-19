import { useState } from 'react';

const ReportIssue = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted:', formData);
        // API call will go here
        alert('Report Submitted! (Mock)');
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="bg-card shadow-card rounded-card overflow-hidden transition-all duration-500 hover:shadow-neon-blue">
                <div className="px-6 py-10 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                    <h3 className="text-3xl font-black text-[#F8FAFC] text-center tracking-tight relative z-10">Report an Issue</h3>
                    <p className="text-blue-200/80 text-sm text-center mt-3 font-medium relative z-10">Help us improve the campus by reporting a problem.</p>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Issue Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="mt-1 block w-full border-gray-200 bg-gray-50/50 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-gray-700 sm:text-sm transition-all"
                                placeholder="e.g., Wi-Fi not working"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-4 pr-10 py-3 text-base border-gray-200 bg-gray-50/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary sm:text-sm rounded-lg transition-all text-gray-700"
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="Infrastructure">Infrastructure</option>
                                <option value="Network">Network</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Academic">Academic</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                placeholder="Describe the issue in detail..."
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                            <input type="file" className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-btn file:border-0 file:text-sm file:font-semibold file:bg-primary/5 file:text-primary hover:file:bg-primary/10 cursor-pointer" />
                        </div>
                        <div>
                            <button type="submit" className="w-full flex justify-center py-4 px-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-btn shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                                Submit Report
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReportIssue;
