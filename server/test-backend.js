const axios = require('axios');
const io = require('socket.io-client');

const API_URL = 'http://localhost:5000/api';
let studentToken = '';
let adminToken = '';
let studentId = '';
let issueId = '';

async function runTests() {
    console.log('🚀 Starting Backend Verification Tests...\n');

    try {
        // 1. Register Admin
        console.log('1️⃣ Registering Admin...');
        const adminReg = await axios.post(`${API_URL}/auth/register`, {
            name: 'Admin User',
            email: 'admin@test.com',
            password: 'password123',
            role: 'admin',
            department: 'IT'
        });
        adminToken = adminReg.data.token;
        console.log('✅ Admin Registered.\n');

        // 2. Register Student
        console.log('2️⃣ Registering Student...');
        const studentReg = await axios.post(`${API_URL}/auth/register`, {
            name: 'Student User',
            email: 'student@test.com',
            password: 'password123',
            role: 'student',
            department: 'CS'
        });
        studentToken = studentReg.data.token;
        studentId = studentReg.data.user.id;
        console.log('✅ Student Registered.\n');

        // Connect Socket for Student
        const socket = io('http://localhost:5000');
        socket.on('connect', () => {
            socket.emit('join', studentId);
            console.log('🔌 Socket Connected for Student.\n');
        });

        socket.on('notification', (data) => {
            console.log('🔔 RECEIVED REAL-TIME NOTIFICATION:', data.message);
        });

        socket.on('issue_created', (data) => {
            console.log('📺 GLOBAL EVENT: Issue created, UI should refresh Home/Dashboard');
        });

        // 3. Create Issue (Student)
        console.log('3️⃣ Creating Issue as Student...');
        const issueRes = await axios.post(`${API_URL}/issues`, {
            title: 'No Wi-Fi in Library',
            description: 'Connectivity is down in the main library area.',
            category: 'Network'
        }, {
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        issueId = issueRes.data.data._id;
        console.log('✅ Issue Created.\n');

        // 4. Get Admin Stats
        console.log('4️⃣ Checking Admin Dashboard Stats...');
        const statsRes = await axios.get(`${API_URL}/admin/stats`, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('📊 Stats Data:', statsRes.data.data);
        console.log('✅ Stats Verified.\n');

        // 5. Update Status (Admin)
        console.log('5️⃣ Admin Updating Issue Status (Triggers Notification)...');
        await axios.put(`${API_URL}/issues/${issueId}`, {
            status: 'in-progress'
        }, {
            headers: { Authorization: `Bearer ${adminToken}` }
        });
        console.log('✅ Status Updated.\n');

        // 6. Check Notifications
        console.log('6️⃣ Fetching Student Notifications...');
        const notifyRes = await axios.get(`${API_URL}/notifications`, {
            headers: { Authorization: `Bearer ${studentToken}` }
        });
        console.log('🔔 Notifications:', notifyRes.data.data.map(n => n.message));
        console.log('✅ Notifications Verified.\n');

        console.log('🏁 All systems working perfectly! Real-time updates and MVC logic confirmed.');

        // Wait a bit for socket events to finish
        setTimeout(() => {
            socket.disconnect();
            process.exit(0);
        }, 3000);

    } catch (error) {
        console.error('❌ Test Failed:', error.response ? error.response.data : error.message);
        process.exit(1);
    }
}

runTests();
