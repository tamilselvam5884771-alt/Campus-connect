import React, { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, Users } from 'lucide-react';
import StatCard from '../components/StatCard';
import AdminIssueTable from '../components/AdminIssueTable';
import AdminResourceTable from '../components/AdminResourceTable';

const Dashboard = () => {
    // Mock Data
    const stats = {
        open: 14,
        pending: 6,
        resolved: 28,
        totalUsers: 142
    };

    const recentIssues = [
        { id: 1, title: 'Library AC Not Working', category: 'Maintenance', reportedBy: 'John Doe', date: '1 hour ago', status: 'open' },
        { id: 2, title: 'WiFi Down in Hostels', category: 'Network', reportedBy: 'Jane Smith', date: '2 hours ago', status: 'in_progress' },
        { id: 3, title: 'Broken Projector Lab 3', category: 'Equipment', reportedBy: 'Alex Johnson', date: '5 hours ago', status: 'resolved' },
    ];

    const resourceRequests = [
        { id: 1, resourceName: 'Projector', requestedBy: 'Mike Wilson', quantity: 1, date: '30 mins ago', status: 'pending' },
        { id: 2, resourceName: 'Arduino Kit', requestedBy: 'Sarah Brown', quantity: 5, date: '1 hour ago', status: 'pending' },
        { id: 3, resourceName: 'Conference Room', requestedBy: 'Tom Davis', quantity: 1, date: '3 hours ago', status: 'approved' },
    ];

    return (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage issues and resource requests</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    icon={AlertTriangle}
                    label="Open Issues"
                    value={stats.open}
                    bgColor="from-amber-500 to-amber-700"
                    iconBgColor="bg-amber-400/20"
                />
                <StatCard
                    icon={Clock}
                    label="Pending Requests"
                    value={stats.pending}
                    bgColor="from-blue-600 to-blue-900"
                    iconBgColor="bg-blue-400/20"
                />
                <StatCard
                    icon={CheckCircle}
                    label="Resolved Issues"
                    value={stats.resolved}
                    bgColor="from-emerald-500 to-emerald-700"
                    iconBgColor="bg-emerald-400/20"
                />
                <StatCard
                    icon={Users}
                    label="Total Users"
                    value={stats.totalUsers}
                    bgColor="from-indigo-500 to-indigo-700"
                    iconBgColor="bg-indigo-400/20"
                />
            </div>

            {/* Tables */}
            <div className="space-y-6">
                <AdminIssueTable issues={recentIssues} />
                <AdminResourceTable resources={resourceRequests} />
            </div>
        </div>
    );
};

export default Dashboard;
