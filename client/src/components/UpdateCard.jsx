import React from 'react';
import { CheckCircle2, FileCheck, ArrowRight } from 'lucide-react';

const UpdateCard = ({ type, title, timestamp }) => {
    const isResolved = type === 'resolved';

    return (
        <div className="flex items-center p-5 bg-card rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer border border-gray-200 hover:border-primary/30">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isResolved ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                {isResolved ? <CheckCircle2 size={24} /> : <FileCheck size={24} />}
            </div>

            <div className="ml-5 flex-1 min-w-0">
                <p className="text-base font-semibold text-gray-700 truncate group-hover:text-primary transition-colors">
                    {title}
                </p>
                <div className="flex items-center mt-1">
                    <span className={`text-xs font-bold px-2 py-1 rounded mr-3 ${isResolved ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}`}>
                        {isResolved ? 'Issue Resolved' : 'Resource Approved'}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">{timestamp}</span>
                </div>
            </div>

            <ArrowRight size={20} className="text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
    );
};

export default UpdateCard;
