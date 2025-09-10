import Contact from "../model/contactModel.js";
import Newsletter from "../model/newsletterModel.js";
import nodemailer from "nodemailer";

// Create transporter for nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aadiigupta25@gmail.com',
        pass: 'vabgiaqzxaaelixy'
    }
});

export const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Save to database
        const contact = new Contact({
            name,
            email,
            subject,
            message
        });

        await contact.save();

        // Send email to admin
        const mailOptions = {
            from: 'aadiigupta25@gmail.com',
            to: 'aadiigupta25@gmail.com',
            subject: `New Contact Form Submission: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
                <hr>
                <p><em>Submitted at: ${new Date().toLocaleString()}</em></p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Message sent successfully! We'll get back to you soon."
        });

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to send message. Please try again."
        });
    }
};

export const subscribeNewsletter = async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email already exists
        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
            return res.status(400).json({
                success: false,
                message: "Email already subscribed!"
            });
        }

        // Save to database
        const newsletter = new Newsletter({ email });
        await newsletter.save();

        // Send welcome email
        const mailOptions = {
            from: 'aadiigupta25@gmail.com',
            to: email,
            subject: 'Welcome to AadiiCart Newsletter! 🎉',
            html: `
                <h2>Welcome to AadiiCart!</h2>
                <p>Thank you for subscribing to our newsletter!</p>
                <p>🎁 <strong>Your 20% discount code: WELCOME20</strong></p>
                <p>Use this code on your next purchase and enjoy exclusive deals!</p>
                <hr>
                <p>Best regards,<br>AadiiCart Team</p>
            `
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Successfully subscribed! Check your email for discount code."
        });

    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({
            success: false,
            message: "Failed to subscribe. Please try again."
        });
    }
};