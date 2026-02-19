import React, { useState } from 'react';
import { User, Send } from 'lucide-react';

const CommentBox = ({ comments = [], onAddComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            onAddComment(newComment);
            setNewComment('');
        }
    };

    return (
        <div className="bg-card backdrop-blur-md shadow-lg rounded-xl p-6 border-2 border-primary/10">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Comments</h3>

            {/* Comments List */}
            <div className="space-y-4 mb-6">
                {comments.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center py-4">No comments yet. Be the first to comment!</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="flex space-x-3">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                    <User className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                            <div className="flex-1 bg-card/60 backdrop-blur-sm p-4 rounded-lg border border-primary/10">
                                <p className="text-sm font-semibold text-gray-900 mb-1">
                                    {comment.user || 'Anonymous'}
                                </p>
                                <p className="text-sm text-gray-700">{comment.text}</p>
                                {comment.timestamp && (
                                    <p className="text-xs text-gray-400 mt-2">{comment.timestamp}</p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Comment Form */}
            <form onSubmit={handleSubmit} className="mt-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 px-4 py-3 bg-card border-2 border-primary/10 rounded-lg focus:outline-none focus:border-primary text-gray-900 placeholder-gray-500 transition-colors"
                    />
                    <button
                        type="submit"
                        className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                        <Send size={18} />
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommentBox;
