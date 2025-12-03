import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, MapPin } from 'lucide-react';
import { contactService } from '../services/api';
import { LoadStatus } from '../types';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<LoadStatus>(LoadStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState('');

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

  return (
    <div className="pt-24 pb-20 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SEO 
        title="Contact" 
        description="Get in touch for freelance opportunities, consulting queries, or general technical discussions."
        keywords={['Contact', 'Hire Me', 'Freelance', 'Consulting', 'Full Stack Engineer']} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Let's Build Something Amazing</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
            I'm currently available for freelance work and full-time opportunities. 
            If you have a project that needs a robust backend or a performant frontend, let's talk.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-white dark:bg-slate-800 p-3 rounded-lg text-brand-600 dark:text-brand-400 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
                <Mail size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-slate-900 dark:text-white font-medium">Email</h3>
                <p className="text-slate-500 dark:text-slate-400">amine.lhb00@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-white dark:bg-slate-800 p-3 rounded-lg text-brand-600 dark:text-brand-400 border border-slate-200 dark:border-slate-700 shadow-sm dark:shadow-none">
                <MapPin size={24} />
              </div>
              <div className="ml-4">
                <h3 className="text-slate-900 dark:text-white font-medium">Location</h3>
                <p className="text-slate-500 dark:text-slate-400">Zweibrücken, Germany (Remote Friendly)</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-slate-800/30 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg dark:shadow-none"
        >
          {status === LoadStatus.SUCCESS ? (
            <div className="text-center py-12">
              <CheckCircle size={64} className="mx-auto text-emerald-500 mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
              <p className="text-slate-500 dark:text-slate-400">Thank you for reaching out. I'll get back to you shortly.</p>
              <button 
                onClick={() => setStatus(LoadStatus.IDLE)} 
                className="mt-6 text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 font-medium"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-brand-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {status === LoadStatus.ERROR && (
                <div className="flex items-center text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm border border-red-200 dark:border-red-900/30">
                  <AlertCircle size={18} className="mr-2" />
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === LoadStatus.LOADING}
                className={`w-full flex items-center justify-center py-3 rounded-lg font-semibold text-white transition-all ${
                  status === LoadStatus.LOADING
                    ? 'bg-slate-400 dark:bg-slate-700 cursor-not-allowed'
                    : 'bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-500/20'
                }`}
              >
                {status === LoadStatus.LOADING ? (
                  <span className="flex items-center">Processing...</span>
                ) : (
                  <span className="flex items-center">Send Message <Send size={18} className="ml-2" /></span>
                )}
              </button>
              <p className="text-xs text-slate-500 text-center mt-4">
                Powered by mocked Elysia + Zod validation logic.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;