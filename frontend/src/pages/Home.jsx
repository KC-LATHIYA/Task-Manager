import React from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    CheckCircle2,
    Zap,
    Shield,
    Layout,
    Users,
    BarChart3,
    Play
} from 'lucide-react';

const Home = () => {
    return (
        <div className="font-sans text-slate-900 bg-white">

            <section className="relative pt-20 pb-32 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-50 to-white -z-10"></div>

                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-3xl -mr-40 -mt-40 -z-10"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-100/40 rounded-full blur-3xl -ml-20 -mb-20 -z-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wide mb-8 animate-in slide-in-from-bottom-4 duration-700">
                        <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                        New Feature: AI Task Summaries
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight animate-in slide-in-from-bottom-8 duration-700 delay-100">
                        Manage tasks like a <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Pro Team</span>
                    </h1>

                    <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-in slide-in-from-bottom-8 duration-700 delay-200">
                        TaskFlow is the all-in-one workspace for your team. Plan, track, and collaborate on projects in real-time without the chaos.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in slide-in-from-bottom-8 duration-700 delay-300">
                        <Link to="/signup" className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                            Start for free <ArrowRight className="w-5 h-5" />
                        </Link>
                        <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
                            <Play className="w-4 h-4 fill-slate-700" /> Watch Demo
                        </button>
                    </div>

                </div>
            </section>

            <section className="py-10 border-y border-slate-100 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by teams at</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
    
                        <span className="text-2xl font-black text-slate-800">ACME</span>
                        <span className="text-2xl font-black text-slate-800">Globex</span>
                        <span className="text-2xl font-black text-slate-800">Soylent</span>
                        <span className="text-2xl font-black text-slate-800">Initech</span>
                        <span className="text-2xl font-black text-slate-800">Umbrella</span>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to ship faster</h2>
                        <p className="text-lg text-slate-500">Stop managing tasks in spreadsheets. TaskFlow gives you the tools to organize, prioritize, and get things done.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all group">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Real-time Sync</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Updates happen instantly. See when a teammate completes a task or adds a comment without refreshing.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all group">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Layout className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Kanban Boards</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Visualize your workflow. Drag and drop tasks between columns to update status instantly.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-green-200 hover:bg-green-50/30 transition-all group">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Enterprise Security</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Bank-grade encryption for your data. Role-based access control keeps sensitive info safe.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all group">
                            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Team Collaboration</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Assign tasks, mention teammates, and keep the conversation in context, right where the work happens.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-pink-200 hover:bg-pink-50/30 transition-all group">
                            <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <BarChart3 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Insightful Analytics</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Track team velocity, completion rates, and bottlenecks with our built-in reporting dashboard.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
                            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Automated Workflows</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Set up rules to auto-assign tasks, move tickets, or send notifications based on triggers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px]"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to boost your productivity?</h2>
                    <p className="text-xl text-slate-400 mb-10">Join thousands of teams who have switched to TaskFlow for better project management.</p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/signup" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-500 hover:-translate-y-1 transition-all">
                            Get Started for Free
                        </Link>
                        <Link to="/login" className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-xl font-bold hover:bg-slate-700 transition-all">
                            Sign In
                        </Link>
                    </div>

                    <p className="mt-8 text-sm text-slate-500">No credit card required • 14-day free trial • Cancel anytime</p>
                </div>
            </section>

        </div>
    );
};

export default Home;