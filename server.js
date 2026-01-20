const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- STEP A: CONFIGURE GMAIL ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'wflix2026@gmail.com',
        pass: 'jbcmrorkyybtkbfx' // No spaces!
    }
});

// --- STEP B: THE OTP ROUTE ---
app.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    const otp = "Hey, your account has been verified. Now you can login without any issue."

    const mailOptions = {
        from: '"WebFlix" <wflix2026@gmail.com>',
        to: email,
        subject: 'Your W-Stream Verification Done',
        html: `
        <div style="background-color: #000; color: #fff; padding: 40px; text-align: center; font-family: sans-serif;">
            <h1 style="color: #e50914; font-size: 60px;">W</h1>
            <p><b style="font-size: 30px; color: #fff; border: 1px solid #333; padding: 10px;">${otp}</b></p>
            <p style="color: #888;">This code expires in 30 minutes.</p>
        </div>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email} with OTP: ${otp}`);
        res.json({ success: true });
    } catch (err) {
        console.error("Nodemailer Error:", err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3000, () => console.log('✅ Server running on http://localhost:3000'));
// Use the port Render gives us, or 3000 if running locally
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
app.use(cors({
    origin: '*', // This allows your Netlify site to talk to your Render server
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));