import React, { useState, useEffect } from 'react';
import { fetchFriendsAppData } from '../../services/dataService';
import { generateTeamInsight } from '../../services/aiService';
import { Calendar, Brain, TrendingUp, TrendingDown } from 'lucide-react';

const AIAnalytics = () => {
    const [performanceData, setPerformanceData] = useState([]);
    const [aiInsight, setAiInsight] = useState("Click the lightbulb to analyze latest performance...");
    const [loading, setLoading] = useState(false);
    const [timeframe, setTimeframe] = useState('week');

    useEffect(() => {
        fetchFriendsAppData().then(setPerformanceData);
    }, []);

    const runAnalysis = async () => {
        setLoading(true);
        const latest = performanceData[performanceData.length - 1];
        const result = await generateTeamInsight(latest, `Timeframe: ${timeframe}`);
        setAiInsight(result);
        setLoading(false);
    };

    return (
        <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold">AI Performance Audit</h1>
                        <p className="text-slate-500">Deep integration with Match Scoring App</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <select 
                            value={timeframe} 
                            onChange={e => setTimeframe(e.target.value)}
                            className="p-2 border rounded-lg"
                        >
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="all">Season to Date</option>
                        </select>
                        <button 
                            onClick={runAnalysis}
                            disabled={loading}
                            className="bg-blue-600 text-white px-6 py-2 rounded-xl flex items-center gap-3 font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20"
                        >
                            <Brain size={20} /> {loading ? "Analyzing..." : "Refresh Insights"}
                        </button>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-700 to-indigo-900 rounded-3xl p-8 text-white shadow-2xl mb-8 relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4 opacity-80 uppercase tracking-widest text-xs font-bold">
                            <SparklesIcon /> AI Intelligence Report
                        </div>
                        <h2 className="text-2xl font-medium leading-relaxed max-w-2xl">
                            "{aiInsight}"
                        </h2>
                    </div>
                    <div className="absolute -right-20 -bottom-20 opacity-10">
                        <Brain size={300} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-6 text-green-600">
                            <TrendingUp size={24} />
                            <h3 className="font-bold text-slate-800">Peak Performance</h3>
                        </div>
                        <div className="space-y-4">
                            {performanceData.map(d => (
                                <div key={d.week} className="flex items-center justify-between border-b border-slate-50 pb-4">
                                    <div>
                                        <p className="font-bold">Week {d.week} - Top Match</p>
                                        <p className="text-xs text-slate-400">Scoring integration sync active</p>
                                    </div>
                                    <div className="text-2xl font-black text-slate-900">{d.bestScore}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-3 mb-6 text-red-500">
                            <TrendingDown size={24} />
                            <h3 className="font-bold text-slate-800">Growth Opportunities</h3>
                        </div>
                        <div className="space-y-4">
                            {performanceData.map(d => (
                                <div key={d.week} className="flex items-center justify-between border-b border-slate-50 pb-4">
                                    <div>
                                        <p className="font-bold">Week {d.week} - Low Match</p>
                                        <p className="text-xs text-slate-400">Bottleneck: {d.notes.split(' ')[0]} issues</p>
                                    </div>
                                    <div className="text-2xl font-black text-slate-600">{d.worstScore}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SparklesIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
);

export default AIAnalytics;
