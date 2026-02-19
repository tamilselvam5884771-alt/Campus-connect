import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, User } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole') || 'student';
    const username = localStorage.getItem('username') || 'Student';

    return (
        <nav className="bg-[#1E3A8A] shadow-navbar sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-white">CampusConnect</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-[#E0E7FF] hover:text-white px-3 py-2 text-sm font-medium transition-colors relative group">
                            Home
                            <div className="absolute bottom-[-18px] left-0 w-full h-[3px] bg-[#3B82F6] scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                        </Link>
                        {isAuthenticated && (
                            <>
                                <Link to="/report" className="text-[#E0E7FF] hover:text-white px-3 py-2 text-sm font-medium transition-colors relative group">
                                    Report Issue
                                    <div className="absolute bottom-[-18px] left-0 w-full h-[3px] bg-[#3B82F6] scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                                </Link>
                                <Link to="/resources" className="text-[#E0E7FF] hover:text-white px-3 py-2 text-sm font-medium transition-colors relative group">
                                    Request Resource
                                    <div className="absolute bottom-[-18px] left-0 w-full h-[3px] bg-[#3B82F6] scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                                </Link>
                                <Link to="/my-reports" className="text-[#E0E7FF] hover:text-white px-3 py-2 text-sm font-medium transition-colors relative group">
                                    My Reports
                                    <div className="absolute bottom-[-18px] left-0 w-full h-[3px] bg-[#3B82F6] scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                                </Link>
                                {userRole === 'admin' && (
                                    <Link to="/dashboard" className="text-white font-bold px-3 py-2 text-sm transition-colors relative group">
                                        Admin Dashboard
                                        <div className="absolute bottom-[-18px] left-0 w-full h-[3px] bg-[#3B82F6] scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                                    </Link>
                                )}
                            </>
                        )}

                        <div className="flex items-center space-x-4 border-l pl-4 border-white/10">
                            {isAuthenticated ? (
                                <>
                                    <button className="text-[#E0E7FF] hover:text-white transition-colors relative">
                                        <Bell size={20} />
                                        <span className="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
                                    </button>
                                    <Link to="/profile" className="flex items-center space-x-2 text-[#E0E7FF] cursor-pointer hover:text-white transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                            <User size={18} className="text-white" />
                                        </div>
                                        <span className="text-sm font-medium capitalize">{username}</span>
                                    </Link>
                                </>
                            ) : (
                                <Link to="/login" className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-btn text-sm font-semibold hover:shadow-lg transition-all transform hover:-translate-y-1">
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#3B82F6] focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-[#1E3A8A] border-t border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
                        <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-[#E0E7FF] hover:text-white hover:bg-white/10">Home</Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/report" className="block px-3 py-2 rounded-md text-base font-medium text-[#E0E7FF] hover:text-white hover:bg-white/10">Report Issue</Link>
                                <Link to="/resources" className="block px-3 py-2 rounded-md text-base font-medium text-[#E0E7FF] hover:text-white hover:bg-white/10">Resources</Link>
                                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-[#E0E7FF] hover:text-white hover:bg-white/10">Profile</Link>
                                {userRole === 'admin' && (
                                    <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">Admin Dashboard</Link>
                                )}
                            </>
                        ) : (
                            <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-white/10">Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
