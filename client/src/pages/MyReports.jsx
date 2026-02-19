import React, { useState } from 'react';
import IssueCard from '../components/IssueCard';
import { FileText, Filter } from 'lucide-react';

const MyReports = () => {
    const [filter, setFilter] = useState('all');

    // Mock data - would come from API
    const myIssues = [
        {
            id: 1,
            title: "WiFi Not Working in Library",
            category: "Network",
            description: "Cannot connect to campus WiFi on 2nd floor",
            upvotes: 15,
            status: "in_progress",
            date: "2 days ago"
        },
        {
            id: 2,
            title: "Broken Chair in Lab 3",
            category: "Infrastructure",
            description: "Chair near window is broken and unsafe",
            upvotes: 8,
            status: "resolved",
            date: "1 week ago"
        },
        {
            id: 3,
            title: "AC Not Cooling in Classroom 201",
            category: "Maintenance",
            description: "Air conditioner making noise but not cooling",
            upvotes: 22,
            status: "open",
            date: "3 hours ago"
        }
    ];

    const filteredIssues = filter === 'all'
        ? myIssues
        : myIssues.filter(issue => issue.status === filter);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <FileText className="text-primary" size={32} />
                    <h1 className="text-3xl font-bold text-gray-900">My Reports</h1>
                </div>
                <p className="text-gray-600">Track all the issues you've reported</p>
            </div>

            {/* Filter */}
            <div className="mb-6 flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-700">
                    <Filter size={20} />
                    <span className="font-medium">Filter:</span>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'all'
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-card text-gray-700 border-2 border-primary/20 hover:border-primary'
                            }`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('open')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'open'
                            ? 'bg-warning text-white shadow-md'
                            : 'bg-card text-gray-700 border-2 border-primary/20 hover:border-primary'
                            }`}
                    >
                        Open
                    </button>
                    <button
                        onClick={() => setFilter('in_progress')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'in_progress'
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-card text-gray-700 border-2 border-primary/20 hover:border-primary'
                            }`}
                    >
                        In Progress
                    </button>
                    <button
                        onClick={() => setFilter('resolved')}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${filter === 'resolved'
                            ? 'bg-success text-white shadow-md'
                            : 'bg-card text-gray-700 border-2 border-primary/20 hover:border-primary'
                            }`}
                    >
                        Resolved
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-card backdrop-blur-md p-4 rounded-xl border-2 border-primary/10">
                    <p className="text-sm text-gray-600 mb-1">Total Reports</p>
                    <p className="text-3xl font-bold text-primary">{myIssues.length}</p>
                </div>
                <div className="bg-card backdrop-blur-md p-4 rounded-xl border-2 border-primary/10">
                    <p className="text-sm text-gray-600 mb-1">Open</p>
                    <p className="text-3xl font-bold text-warning">
                        {myIssues.filter(i => i.status === 'open').length}
                    </p>
                </div>
                <div className="bg-card backdrop-blur-md p-4 rounded-xl border-2 border-primary/10">
                    <p className="text-sm text-gray-600 mb-1">Resolved</p>
                    <p className="text-3xl font-bold text-success">
                        {myIssues.filter(i => i.status === 'resolved').length}
                    </p>
                </div>
            </div>

            {/* Issues Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIssues.length === 0 ? (
                    <div className="col-span-full bg-card backdrop-blur-md border-2 border-primary/10 rounded-xl p-12 text-center">
                        <p className="text-gray-500">No issues found with this filter</p>
                    </div>
                ) : (
                    filteredIssues.map((issue) => (
                        <IssueCard key={issue.id} {...issue} />
                    ))
                )}
            </div>
        </div>
    );
};

export default MyReports;
