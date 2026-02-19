import React from 'react';
import { User, Mail, Award, FileText, ThumbsUp, Settings, X } from 'lucide-react';

const Profile = () => {
    // Mock user data
    const user = {
        name: "John Doe",
        email: "john.doe@campus.edu",
        role: "Student",
        joinDate: "January 2024",
        reportsSubmitted: 12,
        upvotesGiven: 34,
        resolvedIssues: 8
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-700">Profile</h1>
                <p className="text-gray-600 mt-1">Manage your account and view your activity</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-card shadow-card rounded-card p-8">
                        {/* Avatar */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-28 h-28 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-6 shadow-lg transform hover:rotate-6 transition-transform">
                                <User size={56} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-700">{user.name}</h2>
                            <p className="text-sm text-gray-500 font-medium mt-1">{user.email}</p>
                            <span className="mt-4 px-6 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-wide uppercase">
                                {user.role}
                            </span>
                        </div>

                        {/* Info */}
                        <div className="space-y-3 border-t-2 border-primary/10 pt-4">
                            <div className="flex items-center gap-3 text-gray-700">
                                <Mail size={18} className="text-primary" />
                                <span className="text-sm">{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Award size={18} className="text-primary" />
                                <span className="text-sm">Member since {user.joinDate}</span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-4 mt-8">
                            <button className="w-full py-4 px-4 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-btn hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                                <Settings size={20} />
                                Edit Profile
                            </button>
                            <button
                                onClick={() => {
                                    localStorage.clear();
                                    alert('Logged out successfully!');
                                    window.location.href = '/login';
                                }}
                                className="w-full py-4 px-4 bg-white text-danger font-bold rounded-btn border border-danger/20 hover:bg-danger/5 transition-all flex items-center justify-center gap-2"
                            >
                                <X size={20} />
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats & Activity */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Statistics */}
                    <div className="bg-card shadow-card rounded-card p-8">
                        <h3 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2">
                            <div className="w-2 h-6 bg-primary rounded-full"></div>
                            Activity Statistics
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-background/40 backdrop-blur-sm p-4 rounded-xl border border-primary/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <FileText size={20} className="text-primary" />
                                    </div>
                                    <p className="text-sm text-gray-600">Reports Submitted</p>
                                </div>
                                <p className="text-3xl font-bold text-primary">{user.reportsSubmitted}</p>
                            </div>

                            <div className="bg-background/40 backdrop-blur-sm p-4 rounded-xl border border-primary/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-success/10 rounded-lg">
                                        <Award size={20} className="text-success" />
                                    </div>
                                    <p className="text-sm text-gray-600">Issues Resolved</p>
                                </div>
                                <p className="text-3xl font-bold text-success">{user.resolvedIssues}</p>
                            </div>

                            <div className="bg-background/40 backdrop-blur-sm p-4 rounded-xl border border-primary/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-warning/10 rounded-lg">
                                        <ThumbsUp size={20} className="text-warning" />
                                    </div>
                                    <p className="text-sm text-gray-600">Upvotes Given</p>
                                </div>
                                <p className="text-3xl font-bold text-warning">{user.upvotesGiven}</p>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-card shadow-card rounded-card p-8">
                        <h3 className="text-xl font-bold text-gray-700 mb-6 flex items-center gap-2">
                            <div className="w-2 h-6 bg-primary rounded-full"></div>
                            Recent Activity
                        </h3>
                        <div className="space-y-3">
                            <div className="bg-background/40 backdrop-blur-sm p-4 rounded-lg border border-primary/10">
                                <p className="text-sm font-medium text-gray-900">Reported: WiFi issue in Library</p>
                                <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                            </div>
                            <div className="bg-background/40 backdrop-blur-sm p-4 rounded-lg border border-primary/10">
                                <p className="text-sm font-medium text-gray-900">Upvoted: AC malfunction in Lab 3</p>
                                <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                            </div>
                            <div className="bg-background/40 backdrop-blur-sm p-4 rounded-lg border border-primary/10">
                                <p className="text-sm font-medium text-gray-900">Requested: Projector for presentation</p>
                                <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
