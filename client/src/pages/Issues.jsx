import { useState } from 'react';
import IssueCard from '../components/IssueCard';
import { Filter, Search } from 'lucide-react';

const Issues = () => {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data - in a real app, this would come from an API
    const allIssues = [
        {
            id: 1,
            title: "Broken Projector in Lecture Hall A",
            category: "Maintenance",
            description: "The projector in Lecture Hall A keeps flickering and turning off randomly during lectures.",
            upvotes: 42,
            status: "open",
            date: "2 hours ago"
        },
        {
            id: 2,
            title: "Wi-Fi Connectivity Issues in Library",
            category: "Network",
            description: "Cannot connect to 'Campus-Secure' network on the 2nd floor of the library.",
            upvotes: 35,
            status: "in_progress",
            date: "1 day ago"
        },
        {
            id: 3,
            title: "Water Dispenser Empty in Block B",
            category: "Facilities",
            description: "The water dispenser near the main entrance of Block B has been empty since morning.",
            upvotes: 18,
            status: "resolved",
            date: "3 days ago"
        },
        {
            id: 4,
            title: "Lab 5 Door Lock Broken",
            category: "Security",
            description: "The electronic lock on Lab 5 door is not engaging properly after 6 PM.",
            upvotes: 12,
            status: "open",
            date: "5 hours ago"
        },
        {
            id: 5,
            title: "Litter in Sports Complex",
            category: "Janitorial",
            description: "Significant amount of litter near the basketball courts.",
            upvotes: 5,
            status: "open",
            date: "1 hour ago"
        }
    ];

    const filteredIssues = allIssues.filter(issue => {
        const matchesFilter = filter === 'all' || issue.status === filter;
        const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            issue.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Campus Issues</h1>
                <p className="text-gray-600 mt-2">Browse and upvote issues reported by the campus community.</p>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search issues..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 border-gray-200 rounded-lg bg-card shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-700"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    <Filter size={20} className="text-gray-400 hidden sm:block" />
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filter === 'all' ? 'bg-primary text-white shadow-md' : 'bg-card text-gray-700 border-2 border-primary/20 hover:border-primary'}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setFilter('open')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filter === 'open' ? 'bg-warning text-white shadow-md' : 'bg-card text-gray-700 border-2 border-primary/20 hover:border-primary'}`}
                    >
                        Open
                    </button>
                    <button
                        onClick={() => setFilter('in_progress')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filter === 'in_progress' ? 'bg-primary-dark text-white shadow-md' : 'bg-card text-gray-700 border-2 border-primary/20 hover:border-primary'}`}
                    >
                        In Progress
                    </button>
                    <button
                        onClick={() => setFilter('resolved')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${filter === 'resolved' ? 'bg-success text-white shadow-md' : 'bg-card text-gray-700 border-2 border-primary/20 hover:border-primary'}`}
                    >
                        Resolved
                    </button>
                </div>
            </div>

            {filteredIssues.length === 0 ? (
                <div className="bg-card shadow-section rounded-section p-12 text-center">
                    <p className="text-gray-500 font-medium">No issues found matching your criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredIssues.map(issue => (
                        <IssueCard key={issue.id} {...issue} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Issues;
