import React from 'react';
import { Check, X, Eye } from 'lucide-react';

const AdminResourceTable = ({ resources = [] }) => {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-warning/10 text-warning border-warning/20';
            case 'approved': return 'bg-success/10 text-success border-success/20';
            case 'rejected': return 'bg-danger/10 text-danger border-danger/20';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const handleApprove = (resourceId) => {
        console.log(`Approve resource ${resourceId}`);
        // API call would go here
    };

    const handleReject = (resourceId) => {
        console.log(`Reject resource ${resourceId}`);
        // API call would go here
    };

    return (
        <div className="bg-card shadow-card rounded-card p-8 transition-all hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-primary rounded-full"></div>
                Resource Requests
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-primary/5">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Resource Name</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Requested By</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Quantity</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                            <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resources.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500">
                                    No pending resource requests
                                </td>
                            </tr>
                        ) : (
                            resources.map((resource) => (
                                <tr key={resource.id} className="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{resource.resourceName}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{resource.requestedBy || 'Student'}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{resource.quantity || 1}</td>
                                    <td className="py-4 px-4 text-sm text-gray-500">{resource.date}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(resource.status)}`}>
                                            {resource.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            {resource.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(resource.id)}
                                                        className="p-2 text-success hover:bg-success/10 rounded-lg transition-colors"
                                                        title="Approve"
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(resource.id)}
                                                        className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors"
                                                        title="Reject"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminResourceTable;
