import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, AlertCircle, Mail, MapPin } from 'lucide-react';
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
      setErrorMessage(response.error || 'Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <SEO 
        title="Contact" 
        description="Get in touch for freelance opportunities, consulting, or collaborations."
        keywords={['Contact', 'Hire', 'Freelance', 'Consulting']} 
      />

      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 dark:text-white tracking-tight mb-4">
              Get in touch
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
              Have a project in mind? I'd love to hear about it. Send me a message 
              and I'll get back to you as soon as possible.
          </p>

          <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Email</p>
                  <a 
                    href="mailto:amine.lhb00@gmail.com"
                    className="text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
                  >
                    amine.lhb00@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-neutral-600 dark:text-neutral-400" />
              </div>
                <div>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Location</p>
                  <p className="text-neutral-900 dark:text-white">
                    Zweibrücken, Germany
                  </p>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Available for remote work
                  </p>
            </div>
              </div>

              {/* Social Links */}
              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">Connect with me</p>
                <div className="flex gap-3">
                  <a
                    href="https://github.com/aminlahbib"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 rounded-full transition-colors"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/aminlahbib"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-900 rounded-full transition-colors"
                  >
                    LinkedIn
                  </a>
              </div>
            </div>
          </div>
        </motion.div>

          {/* Right - Form */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
          {status === LoadStatus.SUCCESS ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-5">
                  <Check size={28} className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  Message sent!
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-sm">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
              <button 
                onClick={() => setStatus(LoadStatus.IDLE)} 
                  className="text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                  <label htmlFor="name" className="block text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                    Name
                  </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                    placeholder="Your name"
                />
              </div>

              <div>
                  <label htmlFor="email" className="block text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                    Email
                  </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
                    placeholder="your@email.com"
                />
              </div>

              <div>
                  <label htmlFor="message" className="block text-sm text-neutral-500 dark:text-neutral-400 mb-2">
                    Message
                  </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {status === LoadStatus.ERROR && (
                  <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle size={16} />
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === LoadStatus.LOADING}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {status === LoadStatus.LOADING ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 dark:border-neutral-900/30 border-t-white dark:border-t-neutral-900 rounded-full animate-spin" />
                      Sending...
                    </>
                ) : (
                    <>
                      Send Message
                      <Send size={16} />
                    </>
                )}
              </button>
            </form>
          )}
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
