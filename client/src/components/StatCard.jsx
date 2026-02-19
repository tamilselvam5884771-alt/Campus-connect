import React from 'react';

const StatCard = ({ icon: Icon, label, value, bgColor = 'bg-primary', iconBgColor = 'bg-white/20' }) => {
    return (
        <div className={`${bgColor} bg-gradient-to-br text-[#F8FAFC] p-8 rounded-card shadow-card flex items-center justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden group`}>
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>

            <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-widest opacity-90 mb-2">{label}</p>
                <p className="text-5xl font-black">{value}</p>
            </div>
            <div className={`${iconBgColor} p-5 rounded-2xl backdrop-blur-md relative z-10 border border-white/10 group-hover:scale-110 transition-transform`}>
                <Icon className="h-10 w-10 text-white" />
            </div>
        </div>
    );
};

export default StatCard;
