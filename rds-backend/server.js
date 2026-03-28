const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/feedback', require('./routes/feedback'));
app.use('/api/admin', require('./routes/admin'));

// Root route
app.get('/', (req, res) => {
    res.json({ 
        success: true, 
        message: 'RDS API is running',
        endpoints: {
            auth: '/api/auth',
            projects: '/api/projects',
            feedback: '/api/feedback',
            admin: '/api/admin'
        }
    });
});

// Add this route for /api
app.get('/api', (req, res) => {
    res.json({ 
        success: true, 
        message: 'RDS API is running',
        version: '1.0.0',
        endpoints: {
            register: 'POST /api/auth/register',
            login: 'POST /api/auth/login',
            projects: 'GET /api/projects',
            myProfile: 'GET /api/auth/me'
        }
    });
});

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ 
        success: false, 
        message: `Route ${req.originalUrl} not found`
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📡 API URL: http://localhost:${PORT}/api`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}\n`);
});