import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Stars } from '@react-three/drei';
import RobotModel from './RobotModel';

const Simulator = () => {
  const [sensorData, setSensorData] = useState({ x: 0, z: 0, proximity: 0, rotation: 0 });

  return (
    <div className="flex-1 h-screen relative bg-slate-950">
      <div className="absolute top-6 left-6 z-10 bg-slate-900/80 backdrop-blur text-white p-5 rounded-xl border border-slate-700 shadow-2xl">
        <h2 className="text-xl font-bold mb-4 border-b border-slate-700 pb-2">Simulator Telemetry</h2>
        <div className="space-y-2 font-mono text-sm">
          <p><span className="text-blue-400">POS_X:</span> {sensorData.x}</p>
          <p><span className="text-blue-400">POS_Z:</span> {sensorData.z}</p>
          <p><span className="text-blue-400">HEADING:</span> {sensorData.rotation}°</p>
          <p><span className="text-green-400">PROXIMITY:</span> {sensorData.proximity}m</p>
        </div>
        <div className="mt-6 text-xs text-slate-400">
          <p>Controls:</p>
          <p className="mt-1">WASD - Move & Turn</p>
          <p>Mouse - Orbit Camera</p>
        </div>
      </div>

      <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
        <color attach="background" args={['#020617']} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        
        <RobotModel setSensorData={setSensorData} />
        
        <Grid 
          infiniteGrid 
          cellSize={1} 
          sectionSize={5} 
          sectionColor="#3b82f6" 
          sectionThickness={1.5} 
          fadeDistance={30}
        />
        
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
};

export default Simulator;
