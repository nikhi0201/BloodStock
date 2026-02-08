'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Float, MeshDistortMaterial, Line } from '@react-three/drei'
import * as THREE from 'three'

// Animated Blood Cells Particles
function BloodCells({ count = 800 }) {
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
            if (mesh.current) {
                mesh.current.setMatrixAt(i, dummy.matrix)
            }
        })
        if (mesh.current) {
            mesh.current.instanceMatrix.needsUpdate = true
        }
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={2} toneMapped={false} />
        </instancedMesh>
    )
}

// Central Blood Drop with Distortion
function CentralBloodDrop() {
    return (
        <Float speed={3} rotationIntensity={0.5} floatIntensity={1.5}>
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[3, 64, 64]} />
                <MeshDistortMaterial
                    color="#b91c1c"
                    emissive="#7f1d1d"
                    distort={0.5}
                    speed={2}
                    roughness={0.2}
                    metalness={0.6}
                />
            </mesh>
            {/* Core glow */}
            <pointLight position={[0, 0, 0]} intensity={150} color="#ff0000" distance={25} decay={2} />
        </Float>
    )
}

// Heartbeat ECG Wave
function HeartbeatWave() {
    const points = useMemo(() => {
        const pts = []
        for (let i = 0; i < 100; i++) {
            pts.push(new THREE.Vector3((i - 50) * 0.5, 0, 0))
        }
        return pts
    }, [])

    const lineRef = useRef<any>(null)

    useFrame((state) => {
        if (lineRef.current) {
            const t = state.clock.getElapsedTime() * 5
            const positions = lineRef.current.geometry.attributes.position.array

            for (let i = 0; i < 100; i++) {
                const x = (i - 50) * 0.5
                const phase = (i + t * 4) % 100
                let y = 0

                // P-wave
                if (phase > 10 && phase < 20) y += Math.sin((phase - 10) * Math.PI / 10) * 0.3
                // QRS complex
                if (phase > 25 && phase < 35) {
                    if (phase < 28) y -= 0.3
                    else if (phase < 32) y += 2
                    else y -= 0.6
                }
                // T-wave
                if (phase > 40 && phase < 55) y += Math.sin((phase - 40) * Math.PI / 15) * 0.4

                positions[i * 3 + 1] = y * 0.6
            }
            lineRef.current.geometry.attributes.position.needsUpdate = true
        }
    })

    return (
        <Line
            ref={lineRef}
            points={points}
            color="#ff3333"
            lineWidth={2}
            position={[0, -3, -8]}
            transparent
            opacity={0.7}
        />
    )
}

// Pulsing Rings
function PulsingRings() {
    const ring1 = useRef<THREE.Mesh>(null)
    const ring2 = useRef<THREE.Mesh>(null)
    const ring3 = useRef<THREE.Mesh>(null)

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        const pulse = Math.sin(t * 2) * 0.3 + 1

        if (ring1.current) {
            ring1.current.scale.set(pulse, pulse, pulse)
            ring1.current.rotation.x = t * 0.5
        }
        if (ring2.current) {
            ring2.current.scale.set(pulse * 1.2, pulse * 1.2, pulse * 1.2)
            ring2.current.rotation.y = t * 0.3
        }
        if (ring3.current) {
            ring3.current.scale.set(pulse * 1.4, pulse * 1.4, pulse * 1.4)
            ring3.current.rotation.z = t * 0.4
        }
    })

    return (
        <group>
            <mesh ref={ring1} position={[0, 0, 0]}>
                <torusGeometry args={[5, 0.1, 16, 100]} />
                <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={1} transparent opacity={0.4} />
            </mesh>
            <mesh ref={ring2} position={[0, 0, 0]}>
                <torusGeometry args={[7, 0.08, 16, 100]} />
                <meshStandardMaterial color="#b91c1c" emissive="#b91c1c" emissiveIntensity={0.8} transparent opacity={0.3} />
            </mesh>
            <mesh ref={ring3} position={[0, 0, 0]}>
                <torusGeometry args={[9, 0.06, 16, 100]} />
                <meshStandardMaterial color="#991b1b" emissive="#991b1b" emissiveIntensity={0.6} transparent opacity={0.2} />
            </mesh>
        </group>
    )
}

// Moving Spotlight
function MovingLight() {
    const light = useRef<THREE.PointLight>(null)
    useFrame(({ clock }) => {
        if (light.current) {
            light.current.position.x = Math.sin(clock.getElapsedTime() * 0.5) * 20
            light.current.position.z = Math.cos(clock.getElapsedTime() * 0.5) * 20
        }
    })
    return <pointLight ref={light} position={[0, 15, 0]} intensity={200} color="#ff1a1a" distance={50} decay={2} />
}

export default function EnhancedBloodScene() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-slate-950 via-red-950/20 to-slate-950">
            <Canvas camera={{ position: [0, 0, 25], fov: 60 }} shadows gl={{ antialias: true }}>
                <fog attach="fog" args={['#0a0a0a', 15, 60]} />
                <ambientLight intensity={0.3} color="#ff9999" />
                <MovingLight />
                <pointLight position={[10, 10, 10]} intensity={100} color="#ff0000" />
                <pointLight position={[-10, -10, -10]} intensity={80} color="#cc0000" />

                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={0.3}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2.5}
                />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

                <group position={[0, 0, 0]}>
                    <CentralBloodDrop />
                    <PulsingRings />
                    <HeartbeatWave />
                    <Float speed={1.5} rotationIntensity={0} floatIntensity={0.8}>
                        <BloodCells count={600} />
                    </Float>
                </group>
            </Canvas>
        </div>
    )
}
