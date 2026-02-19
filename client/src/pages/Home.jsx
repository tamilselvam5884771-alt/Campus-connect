import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileText, TrendingUp, Activity } from 'lucide-react';
import IssueCard from '../components/IssueCard';
import UpdateCard from '../components/UpdateCard';

const Home = () => {
    // Dummy data for demonstration
    const popularIssues = [
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
            category: "IT Support",
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
        }
    ];

    const recentUpdates = [
        { id: 1, type: "resolved", title: "Resolved: AC malfunction in Lab 3", timestamp: "Just now" },
        { id: 2, type: "approved", title: "Resource Approved: Arduino Kit for Project Team Alpha", timestamp: "2 hours ago" },
        { id: 3, type: "resolved", title: "Resolved: Cafeteria menu not displaying", timestamp: "Yesterday" },
        { id: 4, type: "approved", title: "Resource Approved: Conference Room Booking", timestamp: "2 days ago" }
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

            {/* Welcome Section */}
            <section className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome to CampusConnect 👋</h1>
                    <p className="mt-2 text-gray-600">Report issues, request resources, and stay updated with your campus.</p>
                </div>
                {!localStorage.getItem('isAuthenticated') && (
                    <Link to="/login" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-btn hover:shadow-lg transition-all transform hover:-translate-y-1">
                        Login Now
                    </Link>
                )}
            </section>

            {/* Quick Actions */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <Link to="/report" className="relative overflow-hidden flex items-center p-10 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-section shadow-lg hover:shadow-neon-blue transition-all duration-500 transform hover:-translate-y-2 group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/20 transition-colors"></div>
                    <div className="relative z-10 p-5 bg-gradient-to-br from-primary to-blue-700 rounded-2xl shadow-neon-blue group-hover:scale-110 transition-transform duration-500">
                        <PlusCircle size={40} className="text-white" />
                    </div>
                    <div className="relative z-10 ml-8">
                        <h3 className="text-3xl font-black text-[#F8FAFC] tracking-tight group-hover:text-white transition-colors">Report an Issue</h3>
                        <p className="text-blue-200/80 font-medium mt-2 text-lg">Found a problem? Let us know.</p>
                    </div>
                </Link>

                <Link to="/resources" className="relative overflow-hidden flex items-center p-10 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-section shadow-lg hover:shadow-neon-blue transition-all duration-500 transform hover:-translate-y-2 group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-500/20 transition-colors"></div>
                    <div className="relative z-10 p-5 bg-gradient-to-br from-indigo-500 to-indigo-800 rounded-2xl shadow-neon-blue group-hover:scale-110 transition-transform duration-500">
                        <FileText size={40} className="text-white" />
                    </div>
                    <div className="relative z-10 ml-8">
                        <h3 className="text-3xl font-black text-[#F8FAFC] tracking-tight group-hover:text-indigo-100 transition-colors">Request Resource</h3>
                        <p className="text-indigo-200/80 font-medium mt-2 text-lg">Need equipment or facilities?</p>
                    </div>
                </Link>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Popular Issues Section */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <TrendingUp className="text-primary" />
                            <h2 className="text-2xl font-bold text-gray-700">Trending Issues</h2>
                        </div>
                        <Link to="/issues" className="text-sm font-medium text-primary hover:text-primary-dark hover:underline">View All</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {popularIssues.map(issue => (
                            <IssueCard
                                key={issue.id}
                                title={issue.title}
                                category={issue.category}
                                description={issue.description}
                                upvotes={issue.upvotes}
                                status={issue.status}
                                date={issue.date}
                            />
                        ))}
                    </div>
                </div>

                {/* Latest Updates Section */}
                <div className="lg:col-span-1">
                    <div className="bg-card rounded-section p-8 shadow-section sticky top-24">
                        <div className="flex items-center space-x-2 mb-6">
                            <Activity className="text-primary" />
                            <h2 className="text-xl font-bold text-gray-700">Latest Updates</h2>
                        </div>

                        <div className="space-y-4">
                            {recentUpdates.map(update => (
                                <UpdateCard
                                    key={update.id}
                                    type={update.type}
                                    title={update.title}
                                    timestamp={update.timestamp}
                                />
                            ))}
                        </div>

                        <button className="w-full mt-6 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:border-primary hover:text-primary transition-all">
                            View All Activity
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
