import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, PerspectiveCamera } from '@react-three/drei';

const RobotModel = ({ setSensorData }) => {
  const robotRef = useRef();
  const [keys, setKeys] = useState({});

  useEffect(() => {
    const handleDown = (e) => setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: true }));
    const handleUp = (e) => setKeys(prev => ({ ...prev, [e.key.toLowerCase()]: false }));
    window.addEventListener('keydown', handleDown);
    window.addEventListener('keyup', handleUp);
    return () => {
      window.removeEventListener('keydown', handleDown);
      window.removeEventListener('keyup', handleUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!robotRef.current) return;

    const speed = 5 * delta;
    const turnSpeed = 3 * delta;

    if (keys['w']) robotRef.current.translateZ(-speed);
    if (keys['s']) robotRef.current.translateZ(speed);
    if (keys['a']) robotRef.current.rotation.y += turnSpeed;
    if (keys['d']) robotRef.current.rotation.y -= turnSpeed;

    // Simulate sensor: Distance to origin (0,0,0) as a logic example
    const dist = robotRef.current.position.length();
    setSensorData({
        x: robotRef.current.position.x.toFixed(2),
        z: robotRef.current.position.z.toFixed(2),
        proximity: dist.toFixed(2),
        rotation: (robotRef.current.rotation.y * (180/Math.PI)).toFixed(0)
    });
  });

  return (
    <group ref={robotRef} position={[0, 0.5, 0]}>
      {/* Robot Chassis */}
      <Box args={[1, 0.5, 1.2]}>
        <meshStandardMaterial color="#3b82f6" />
      </Box>
      {/* Front Camera/Sensor Mockup */}
      <Box args={[0.2, 0.2, 0.2]} position={[0, 0.3, -0.6]}>
        <meshStandardMaterial color="black" />
      </Box>
      {/* Wheels */}
      <Box args={[0.1, 0.4, 0.4]} position={[0.55, -0.1, 0.4]}><meshStandardMaterial color="black" /></Box>
      <Box args={[0.1, 0.4, 0.4]} position={[-0.55, -0.1, 0.4]}><meshStandardMaterial color="black" /></Box>
      <Box args={[0.1, 0.4, 0.4]} position={[0.55, -0.1, -0.4]}><meshStandardMaterial color="black" /></Box>
      <Box args={[0.1, 0.4, 0.4]} position={[-0.55, -0.1, -0.4]}><meshStandardMaterial color="black" /></Box>
    </group>
  );
};

export default RobotModel;
