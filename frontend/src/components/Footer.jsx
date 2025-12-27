import React from 'react';
import { CheckSquare, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <CheckSquare className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold">TaskFlow</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Streamline your team's workflow with intelligent task management and real-time collaboration.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="hover:text-blue-400 transition-colors bg-slate-800 p-2 rounded-lg"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-400 transition-colors bg-slate-800 p-2 rounded-lg"><Github className="h-5 w-5" /></a>
              <a href="#" className="hover:text-blue-400 transition-colors bg-slate-800 p-2 rounded-lg"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500 gap-4">
          <p className="text-center md:text-left">&copy; 2025 TaskFlow Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;