import React from 'react';
import { Check, X, Eye, Trash2 } from 'lucide-react';

const AdminIssueTable = ({ issues = [] }) => {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'open': return 'bg-warning/10 text-warning border-warning/20';
            case 'in_progress': return 'bg-primary/10 text-primary border-primary/20';
            case 'resolved': return 'bg-success/10 text-success border-success/20';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const handleStatusChange = (issueId, newStatus) => {
        console.log(`Change issue ${issueId} status to ${newStatus}`);
        // API call would go here
    };

    const handleDelete = (issueId) => {
        console.log(`Delete issue ${issueId}`);
        // API call would go here
    };

    return (
        <div className="bg-card shadow-card rounded-card p-8 transition-all hover:shadow-xl">
            <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-primary rounded-full"></div>
                Recent Issues
            </h2>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 border-primary/5">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Title</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Reported By</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                            <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-8 text-gray-500">
                                    No issues to display
                                </td>
                            </tr>
                        ) : (
                            issues.map((issue) => (
                                <tr key={issue.id} className="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{issue.title}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{issue.category}</td>
                                    <td className="py-4 px-4 text-sm text-gray-700">{issue.reportedBy || 'Student'}</td>
                                    <td className="py-4 px-4 text-sm text-gray-500">{issue.date}</td>
                                    <td className="py-4 px-4">
                                        <select
                                            value={issue.status}
                                            onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(issue.status)} cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50`}
                                        >
                                            <option value="open">Open</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(issue.id)}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
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

export default AdminIssueTable;
