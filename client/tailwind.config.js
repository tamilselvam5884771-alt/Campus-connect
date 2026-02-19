/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',
                'primary-dark': '#1E3A8A',
                background: '#F8FAFC',
                card: '#FFFFFF',
                success: '#10B981',
                warning: '#F59E0B',
                danger: '#DC2626',
                'stat-open': '#F59E0B',
                'stat-pending': '#1E3A8A',
                'stat-resolved': '#059669',
                'stat-total': '#4F46E5',
            },
            boxShadow: {
                'card': '0 6px 18px rgba(0,0,0,0.08)',
                'navbar': '0 4px 12px rgba(0,0,0,0.1)',
                'section': '0 8px 24px rgba(0,0,0,0.05)',
                'neon-blue': '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.2)',
                'neon-amber': '0 0 20px rgba(245, 158, 11, 0.5), 0 0 40px rgba(245, 158, 11, 0.2)',
            },
            borderRadius: {
                'card': '14px',
                'section': '18px',
                'btn': '10px',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
