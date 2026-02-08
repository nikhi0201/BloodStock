'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* -------------------- Buildings -------------------- */

function Buildings() {
  const buildingsRef = useRef<any[]>([])

  if (buildingsRef.current.length === 0) {
    buildingsRef.current = Array.from({ length: 150 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 60,
        0,
        (Math.random() - 0.5) * 60,
      ] as [number, number, number],
      height: Math.random() * 8 + 2,
      width: Math.random() * 1.5 + 0.5,
    }))
  }

  return (
    <group>
      {buildingsRef.current.map((b, i) => (
        <mesh
          key={i}
          position={[b.position[0], b.height / 2, b.position[2]]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[b.width, b.height, b.width]} />
          <meshStandardMaterial
            color={i % 20 === 0 ? '#ef4444' : '#0f172a'}
            emissive={i % 20 === 0 ? '#7f1d1d' : '#000000'}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

/* -------------------- Blood Drop -------------------- */

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
      <pointLight
        position={[0, 15, 0]}
        intensity={100}
        color="#ff0000"
        distance={20}
        decay={2}
      />
    </Float>
  )
}

/* -------------------- Particles -------------------- */

type Particle = {
  t: number
  factor: number
  speed: number
  xFactor: number
  yFactor: number
  zFactor: number
  mx: number
  my: number
}

function Particles({ count = 1000 }) {
  const mesh = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  const particlesRef = useRef<Particle[]>([])

  if (particlesRef.current.length === 0) {
    const temp: Particle[] = []
    for (let i = 0; i < count; i++) {
      temp.push({
        t: Math.random() * 100,
        factor: 20 + Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        xFactor: -50 + Math.random() * 100,
        yFactor: -50 + Math.random() * 100,
        zFactor: -50 + Math.random() * 100,
        mx: 0,
        my: 0,
      })
    }
    particlesRef.current = temp
  }

  useFrame(() => {
    particlesRef.current.forEach((particle, i) => {
      particle.t += particle.speed / 2

      const a = Math.cos(particle.t) + Math.sin(particle.t) / 10
      const b = Math.sin(particle.t) + Math.cos(particle.t * 2) / 10
      const s = Math.cos(particle.t)

      dummy.position.set(
        (particle.mx / 10) * a +
          particle.xFactor +
          Math.cos((particle.t / 10) * particle.factor) +
          (Math.sin(particle.t) * particle.factor) / 10,

        (particle.my / 10) * b +
          particle.yFactor +
          Math.sin((particle.t / 10) * particle.factor) +
          (Math.cos(particle.t * 2) * particle.factor) / 10,

        (particle.my / 10) * b +
          particle.zFactor +
          Math.cos((particle.t / 10) * particle.factor) +
          (Math.sin(particle.t * 3) * particle.factor) / 10
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
      <meshStandardMaterial
        color="#ef4444"
        emissive="#ef4444"
        emissiveIntensity={3}
        toneMapped={false}
      />
    </instancedMesh>
  )
}

/* -------------------- Moving Light -------------------- */

function MovingLight() {
  const light = useRef<THREE.PointLight>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    light.current.position.x = Math.sin(t) * 30
    light.current.position.z = Math.cos(t) * 30
  })

  return (
    <pointLight
      ref={light}
      position={[0, 20, 0]}
      intensity={300}
      color="#dc2626"
      distance={60}
      decay={2}
    />
  )
}

/* -------------------- Main Scene -------------------- */

export default function CityMap() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950">
      <Canvas
        camera={{ position: [20, 20, 20], fov: 50 }}
        shadows
        gl={{ antialias: true }}
      >
        <fog attach="fog" args={['#020617', 10, 80]} />
        <ambientLight intensity={0.2} />

        <MovingLight />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2.2}
        />

        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        <group position={[0, -5, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[200, 200]} />
            <meshStandardMaterial color="#020617" />
          </mesh>

          <Buildings />
          <BloodDrop />

          <Float speed={1.5} rotationIntensity={0} floatIntensity={1}>
            <Particles count={400} />
          </Float>
        </group>
      </Canvas>
    </div>
  )
}
