import React, { useState, useEffect } from 'react';
import { fetchFtcScoutData } from '../../services/dataService';
import { TrendingUp, Award, Activity, History } from 'lucide-react';

const Scouting = () => {
    const [teamNum, setTeamNum] = useState('16379');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetch = async () => {
        setLoading(true);
        const res = await fetchFtcScoutData(teamNum);
        setData(res);
        setLoading(false);
    };

    useEffect(() => { handleFetch(); }, []);

    return (
        <div className="flex-1 p-8 bg-white overflow-y-auto">
            <div className="max-w-5xl mx-auto">
                <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">FTC Scout Integration</h1>
                        <p className="text-slate-500">Live competitive intelligence from ftcscout.org</p>
                    </div>
                    <div className="flex gap-2">
                        <input 
                            type="text" 
                            className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-32" 
                            value={teamNum} 
                            onChange={e => setTeamNum(e.target.value)} 
                        />
                        <button onClick={handleFetch} className="bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition">Fetch Data</button>
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>
                ) : data ? (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center gap-4">
                                <Award className="text-blue-600" size={32} />
                                <div><p className="text-xs text-blue-600 font-bold uppercase">OPR Rank</p><p className="text-2xl font-bold">#{data.rank}</p></div>
                            </div>
                            <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-center gap-4">
                                <Activity className="text-green-600" size={32} />
                                <div><p className="text-xs text-green-600 font-bold uppercase">Avg Score</p><p className="text-2xl font-bold">165</p></div>
                            </div>
                            <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 flex items-center gap-4">
                                <TrendingUp className="text-purple-600" size={32} />
                                <div><p className="text-xs text-purple-600 font-bold uppercase">Win Rate</p><p className="text-2xl font-bold">75%</p></div>
                            </div>
                            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 flex items-center gap-4">
                                <History className="text-orange-600" size={32} />
                                <div><p className="text-xs text-orange-600 font-bold uppercase">Matches</p><p className="text-2xl font-bold">{data.matches.length}</p></div>
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-xl">
                            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                                <h3 className="text-white font-bold text-lg">Detailed Match History</h3>
                                <span className="text-slate-400 text-sm">Season 2023-24</span>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-slate-800 text-slate-400 text-xs uppercase font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Match ID</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Auto</th>
                                        <th className="px-6 py-4">TeleOp</th>
                                        <th className="px-6 py-4">Endgame</th>
                                        <th className="px-6 py-4">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="text-white divide-y divide-slate-800">
                                    {data.matches.map(m => (
                                        <tr key={m.id} className="hover:bg-slate-800/50 transition">
                                            <td className="px-6 py-4 font-mono">#{m.id}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${m.result === 'W' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                    {m.result === 'W' ? 'Victory' : 'Defeat'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">{m.auto}</td>
                                            <td className="px-6 py-4">{m.teleop}</td>
                                            <td className="px-6 py-4">{m.endgame}</td>
                                            <td className="px-6 py-4 font-bold text-blue-400">{m.score}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="py-20 text-center text-slate-500">No data found. Try another team number.</div>
                )}
            </div>
        </div>
    );
};

export default Scouting;
