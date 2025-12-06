import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, MapPin, Github, Linkedin, ArrowUpRight, Clock, MessageSquare } from 'lucide-react';
import { contactService } from '../services/api';
import { LoadStatus } from '../types';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(LoadStatus.LOADING);
    setErrorMessage('');

    const response = await contactService.submit(formData);

    if (response.success) {
      setStatus(LoadStatus.SUCCESS);
      setFormData({ name: '', email: '', message: '' });
    } else {
      setStatus(LoadStatus.ERROR);
      setErrorMessage(response.error || 'Something went wrong. Please try again.');
    }
  };

  const contactInfo = [
    {
      icon: <Mail size={22} />,
      label: "Email",
      value: "amine.lhb00@gmail.com",
      href: "mailto:amine.lhb00@gmail.com",
      color: "from-brand-500 to-violet-500"
    },
    {
      icon: <MapPin size={22} />,
      label: "Location",
      value: "Zweibrücken, Germany",
      subtext: "Remote Friendly",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: <Clock size={22} />,
      label: "Response Time",
      value: "Within 24 hours",
      subtext: "Usually faster",
      color: "from-accent-500 to-blue-500"
    }
  ];

  const socialLinks = [
    { icon: <Github size={20} />, label: "GitHub", href: "https://github.com/aminlahbib" },
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/amine-lahbib-60877321b/" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <SEO 
        title="Contact" 
        description="Get in touch for freelance opportunities, consulting queries, or general technical discussions."
        keywords={['Contact', 'Hire Me', 'Freelance', 'Consulting', 'Full Stack Engineer']} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 mb-4">
            Get in Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-surface-900 dark:text-white mb-4">
            Let's Build Something{' '}
            <span className="gradient-text">Amazing</span>
          </h1>
          <p className="text-lg text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            I'm currently available for freelance work and full-time opportunities. 
            Have a project in mind? Let's discuss how I can help.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Info Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group"
                >
                  {info.href ? (
                    <a 
                      href={info.href}
                      className="flex items-start gap-4 p-5 bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700 hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all duration-300 hover:shadow-lg"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                        {info.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-surface-500 dark:text-surface-400 mb-1">{info.label}</p>
                        <p className="text-surface-900 dark:text-white font-medium truncate group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {info.value}
                        </p>
                      </div>
                      <ArrowUpRight size={18} className="text-surface-400 group-hover:text-brand-500 transition-colors flex-shrink-0" />
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 p-5 bg-white dark:bg-surface-800/50 rounded-2xl border border-surface-200 dark:border-surface-700">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-surface-500 dark:text-surface-400 mb-1">{info.label}</p>
                        <p className="text-surface-900 dark:text-white font-medium">{info.value}</p>
                        {info.subtext && (
                          <p className="text-sm text-surface-500 dark:text-surface-400">{info.subtext}</p>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div variants={itemVariants}>
              <p className="text-sm font-semibold text-surface-500 dark:text-surface-400 uppercase tracking-wider mb-4">
                Connect with me
              </p>
              <div className="flex gap-3">
                {socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-surface-800/50 rounded-xl border border-surface-200 dark:border-surface-700 text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-white hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all hover:shadow-md"
                  >
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div 
              variants={itemVariants}
              className="p-6 bg-gradient-to-br from-brand-500/10 to-accent-500/10 rounded-2xl border border-brand-500/20"
            >
              <div className="flex items-start gap-3 mb-4">
                <MessageSquare size={20} className="text-brand-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-surface-900 dark:text-white mb-1">Quick Response</h3>
                  <p className="text-sm text-surface-600 dark:text-surface-400">
                    I typically respond to inquiries within 24 hours. For urgent matters, please mention it in your message.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-surface-800/30 p-8 sm:p-10 rounded-3xl border border-surface-200 dark:border-surface-700 shadow-xl dark:shadow-none">
              {status === LoadStatus.SUCCESS ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle size={40} className="text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-surface-900 dark:text-white mb-3">Message Sent!</h3>
                  <p className="text-surface-500 dark:text-surface-400 mb-8 max-w-sm mx-auto">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => setStatus(LoadStatus.IDLE)} 
                    className="px-6 py-3 rounded-xl bg-surface-100 dark:bg-surface-700 text-surface-700 dark:text-surface-300 font-medium hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                      Name
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'scale-[1.01]' : ''}`}>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-surface-50 dark:bg-surface-900 border-2 border-surface-200 dark:border-surface-700 rounded-xl px-4 py-3.5 text-surface-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-all placeholder-surface-400"
                        placeholder="Your name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                      Email
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'scale-[1.01]' : ''}`}>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-surface-50 dark:bg-surface-900 border-2 border-surface-200 dark:border-surface-700 rounded-xl px-4 py-3.5 text-surface-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-all placeholder-surface-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-surface-700 dark:text-surface-300">
                      Message
                    </label>
                    <div className={`relative transition-all duration-300 ${focusedField === 'message' ? 'scale-[1.01]' : ''}`}>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        className="w-full bg-surface-50 dark:bg-surface-900 border-2 border-surface-200 dark:border-surface-700 rounded-xl px-4 py-3.5 text-surface-900 dark:text-white focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 transition-all resize-none placeholder-surface-400"
                        placeholder="Tell me about your project, timeline, and how I can help..."
                      />
                    </div>
                    <p className="text-xs text-surface-400 dark:text-surface-500">
                      Include project details, timeline, and budget if applicable.
                    </p>
                  </div>

                  {/* Error Message */}
                  {status === LoadStatus.ERROR && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
                    >
                      <AlertCircle size={20} className="flex-shrink-0" />
                      <span className="text-sm">{errorMessage}</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === LoadStatus.LOADING}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white transition-all ${
                      status === LoadStatus.LOADING
                        ? 'bg-surface-400 dark:bg-surface-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-brand-500 to-accent-500 hover:from-brand-600 hover:to-accent-600 shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:shadow-xl hover:-translate-y-0.5'
                    }`}
                  >
                    {status === LoadStatus.LOADING ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
