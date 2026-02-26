import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Plus, Search, Minus, Package, Trash2 } from 'lucide-react';

const Inventory = () => {
  const [parts, setParts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newPart, setNewPart] = useState({ name: '', quantity: 0, description: '', category: 'Motor' });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'inventory'), (snapshot) => {
      const partsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setParts(partsData);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleAddPart = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'inventory'), { ...newPart, quantity: Number(newPart.quantity) });
    setNewPart({ name: '', quantity: 0, description: '', category: 'Motor' });
    setShowAdd(false);
  };

  const updateQty = async (id, delta) => {
    const partRef = doc(db, 'inventory', id);
    const part = parts.find(p => p.id === id);
    await updateDoc(partRef, { quantity: Math.max(0, part.quantity + delta) });
  };

  const filteredParts = parts.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 p-8 bg-slate-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Part Inventory</h1>
            <p className="text-slate-500">Track and manage your robotics hardware</p>
          </div>
          <button 
            onClick={() => setShowAdd(!showAdd)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
          >
            <Plus size={20} /> Add New Part
          </button>
        </div>

        {showAdd && (
          <form onSubmit={handleAddPart} className="bg-white p-6 rounded-xl border border-slate-200 mb-8 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Name</label>
              <input type="text" required value={newPart.name} onChange={e => setNewPart({...newPart, name: e.target.value})} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Category</label>
              <select value={newPart.category} onChange={e => setNewPart({...newPart, category: e.target.value})} className="w-full p-2 border rounded">
                <option>Motor</option><option>Sensor</option><option>Structure</option><option>Electronic</option><option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Quantity</label>
              <input type="number" required value={newPart.quantity} onChange={e => setNewPart({...newPart, quantity: e.target.value})} className="w-full p-2 border rounded" />
            </div>
            <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">Save Part</button>
          </form>
        )}

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search parts, motors, sensors..." 
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredParts.map(part => (
            <div key={part.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between mb-4">
                <div className="bg-blue-50 p-3 rounded-lg text-blue-600">
                  <Package size={24} />
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded-full text-slate-600 uppercase uppercase">{part.category}</span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-800">{part.name}</h3>
              <p className="text-sm text-slate-500 mb-4 line-clamp-2">{part.description || 'No description provided.'}</p>
              
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-4">
                  <button onClick={() => updateQty(part.id, -1)} className="p-1 rounded-full border hover:bg-slate-50"><Minus size={16}/></button>
                  <span className={`text-xl font-bold ${part.quantity < 3 ? 'text-red-500' : 'text-slate-800'}`}>{part.quantity}</span>
                  <button onClick={() => updateQty(part.id, 1)} className="p-1 rounded-full border hover:bg-slate-50"><Plus size={16}/></button>
                </div>
                <button onClick={async () => await deleteDoc(doc(db, 'inventory', part.id))} className="text-red-400 hover:text-red-600 transition">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {loading && <div className="text-center py-20 text-slate-400">Loading inventory...</div>}
        {!loading && filteredParts.length === 0 && <div className="text-center py-20 text-slate-400">No parts found matching your criteria.</div>}
      </div>
    </div>
  );
};

export default Inventory;
