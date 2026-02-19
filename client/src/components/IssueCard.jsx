import React from 'react';
import { ArrowUp, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const IssueCard = ({ title, description, category, upvotes, status, date }) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'open': return 'bg-warning/10 text-warning border-warning/20';
            case 'in_progress': return 'bg-primary/10 text-primary border-primary/20';
            case 'resolved': return 'bg-success/10 text-success border-success/20';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'open': return <AlertCircle size={14} className="mr-1" />;
            case 'in_progress': return <Clock size={14} className="mr-1" />;
            case 'resolved': return <CheckCircle size={14} className="mr-1" />;
            default: return <AlertCircle size={14} className="mr-1" />;
        }
    };

    const getBorderStyles = (status) => {
        switch (status.toLowerCase()) {
            case 'open': return 'border-l-[#3B82F6] border-[#3B82F6]/10';
            case 'in_progress': return 'border-l-[#F59E0B] border-[#F59E0B]/10';
            case 'resolved': return 'border-l-[#10B981] border-[#10B981]/10';
            default: return 'border-l-gray-300 border-gray-200';
        }
    };

    return (
        <div className={`bg-card rounded-card shadow-card border-l-6 border ${getBorderStyles(status)} hover:shadow-xl transition-all duration-300 overflow-hidden group`}>
            <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                        {getStatusIcon(status)}
                        {status.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-500">{date}</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-700 mb-2 group-hover:text-primary transition-colors line-clamp-1">{title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors group/btn">
                            <ArrowUp size={18} className="group-hover/btn:scale-110 transition-transform" />
                            <span className="font-medium text-sm">{upvotes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-primary transition-colors">
                            <MessageSquare size={18} />
                            <span className="font-medium text-sm">Comment</span>
                        </button>
                    </div>
                    <button className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IssueCard;
