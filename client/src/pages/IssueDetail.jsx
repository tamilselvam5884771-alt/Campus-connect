import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThumbsUp } from 'lucide-react';
import CommentBox from '../components/CommentBox';

const IssueDetail = () => {
    const { id } = useParams();
    const [issue, setIssue] = useState({
        title: 'Wi-Fi Not Working in Library',
        status: 'in_progress',
        upvotes: 12,
        category: 'Network',
        description: 'The Wi-Fi in the library has been down for two days. Students cannot study properly.',
        reportedBy: 'John Doe',
        date: '2 days ago',
        comments: [
            { id: 1, user: 'Admin', text: "We're checking it.", timestamp: '1 day ago' },
            { id: 2, user: 'Jane Smith', text: "+1, same issue here", timestamp: '12 hours ago' }
        ]
    });

    const isAdmin = true; // This would come from auth context

    const handleAddComment = (commentText) => {
        const newComment = {
            id: issue.comments.length + 1,
            user: 'Current User',
            text: commentText,
            timestamp: 'Just now'
        };
        setIssue({ ...issue, comments: [...issue.comments, newComment] });
    };

    const handleUpvote = () => {
        setIssue({ ...issue, upvotes: issue.upvotes + 1 });
    };

    const handleStatusChange = (newStatus) => {
        setIssue({ ...issue, status: newStatus });
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            {/* Issue Details */}
            <div className="bg-card backdrop-blur-md shadow-lg overflow-hidden rounded-xl mb-6 border-2 border-primary/10">
                <div className="px-6 py-5 flex justify-between items-start bg-primary/5 border-b-2 border-primary/10">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{issue.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                                <span className="font-medium">Category:</span> {issue.category}
                            </span>
                            <span className="flex items-center gap-1">
                                <span className="font-medium">Reported by:</span> {issue.reportedBy}
                            </span>
                            <span>{issue.date}</span>
                        </div>
                    </div>
                    {isAdmin ? (
                        <select
                            value={issue.status}
                            onChange={(e) => handleStatusChange(e.target.value)}
                            className="px-4 py-2 bg-card border-2 border-primary/20 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer"
                        >
                            <option value="open">Open</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                        </select>
                    ) : (
                        <span className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 ${issue.status === 'open' ? 'bg-warning/10 text-warning border-warning/20' :
                            issue.status === 'in_progress' ? 'bg-primary/10 text-primary border-primary/20' :
                                'bg-success/10 text-success border-success/20'
                            }`}>
                            {issue.status === 'in_progress' ? 'In Progress' : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
                        </span>
                    )}
                </div>
                <div className="px-6 py-5">
                    <p className="text-gray-700 text-base mb-4">{issue.description}</p>
                    <button
                        onClick={handleUpvote}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-md hover:shadow-lg"
                    >
                        <ThumbsUp size={18} />
                        Upvote ({issue.upvotes})
                    </button>
                </div>
            </div >
            {/* Comments */}
            < CommentBox comments={issue.comments} onAddComment={handleAddComment} />
        </div >
    );
};

export default IssueDetail;
