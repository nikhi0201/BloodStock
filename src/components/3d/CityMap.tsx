'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Buildings() {
  const buildings = useMemo(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      position: [(Math.random() - 0.5) * 60, 0, (Math.random() - 0.5) * 60] as [number, number, number],
      height: Math.random() * 8 + 2,
      width: Math.random() * 1.5 + 0.5,
    }))
  }, [])

  return (
    <group>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.position[0], b.height / 2, b.position[2]]} castShadow receiveShadow>
          <boxGeometry args={[b.width, b.height, b.width]} />
          <meshStandardMaterial
            color={i % 20 === 0 ? "#ef4444" : "#0f172a"}
            emissive={i % 20 === 0 ? "#7f1d1d" : "#000000"}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

function BloodDrop() {
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <mesh position={[0, 15, 0]}>
        <sphereGeometry args={[4, 64, 64]} />
        <MeshDistortMaterial
          color="#ef4444"
          emissive="#991b1b"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      {/* Core glow */}
      <pointLight position={[0, 15, 0]} intensity={100} color="#ff0000" distance={20} decay={2} />
    </Float>
  )
}

function Particles({ count = 1000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -50 + Math.random() * 100
      const yFactor = -50 + Math.random() * 100
      const zFactor = -50 + Math.random() * 100
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (!mesh.current) return
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t)

      dummy.position.set(
        (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.08, 0]} />
      <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={3} toneMapped={false} />
    </instancedMesh>
  )
}

function MovingLight() {
  const light = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    if (light.current) {
      light.current.position.x = Math.sin(clock.getElapsedTime()) * 30
      light.current.position.z = Math.cos(clock.getElapsedTime()) * 30
    }
  })
  return <pointLight ref={light} position={[0, 20, 0]} intensity={300} color="#dc2626" distance={60} decay={2} />
}

export default function CityMap() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950">
      <Canvas camera={{ position: [20, 20, 20], fov: 50 }} shadows gl={{ antialias: true }}>
        <fog attach="fog" args={['#020617', 10, 80]} />
        <ambientLight intensity={0.2} color="#ffffff" />
        <MovingLight />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2.2} />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <group position={[0, -5, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.8} />
          </mesh>
          <Buildings />
          <BloodDrop />
          <Float speed={1.5} rotationIntensity={0} floatIntensity={1}>
            {/* Red "Cells" */}
            <Particles count={400} />
          </Float>
        </group>
      </Canvas>
    </div>
  )
}
