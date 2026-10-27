import React, { useState, FormEvent } from 'react';
import Section from './section';
import { ContactFormData, ContactFormErrors } from '../types';

const Form: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: ContactFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 30) {
      newErrors.message = 'Message must be at least 30 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission - replace with your preferred method
      // Options: Netlify Forms, Formspree, EmailJS, or custom backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      // For now, just show success message
      // In production, you would integrate with your preferred form service
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section title="Contact Me">
      <div className="max-w-2xl mx-auto">
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-sm">
            Thank you for your message! I&apos;ll get back to you soon.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-200 rounded-sm">
            Sorry, there was an error sending your message. Please try again or contact me directly.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-sm bg-white dark:bg-gray-900 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 dark:border-gray-700 dark:text-white ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your full name"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-sm bg-white dark:bg-gray-900 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 dark:border-gray-700 dark:text-white ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="subject" className="block font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-sm bg-white dark:bg-gray-900 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 dark:border-gray-700 dark:text-white ${
                errors.subject ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="What&apos;s this about?"
            />
            {errors.subject && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className={`w-full px-3 py-2 border rounded-sm bg-white dark:bg-gray-900 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-900 dark:border-gray-700 dark:text-white ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder=""
            />
            {errors.message && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-primary-700 hover:bg-primary-800 disabled:bg-primary-400 dark:bg-primary-600 dark:hover:bg-primary-500 text-white font-mono text-sm uppercase tracking-wider rounded-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </Section>
  );
};

export default Form;