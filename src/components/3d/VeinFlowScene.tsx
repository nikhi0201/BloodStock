"use client"

import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'

function BloodCells({ count = 400 }) {
    const mesh = useRef<THREE.InstancedMesh>(null)
    const { clock } = useThree()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const speed = 0.03 + Math.random() * 0.12
            const x = (Math.random() - 0.5) * 18
            const y = (Math.random() - 0.5) * 18
            const z = (Math.random() - 0.5) * 40

            const rotX = Math.random() * 0.02
            const rotY = Math.random() * 0.02
            const rotZ = Math.random() * 0.02

            const scale = 0.3 + Math.random() * 0.6
            const wobble = Math.random() * 2

            temp.push({ speed, x, y, z, rotX, rotY, rotZ, scale, wobble })
        }
        return temp
    }, [count])

    useFrame(() => {
        if (!mesh.current) return
        const t = clock.getElapsedTime()

        particles.forEach((particle, i) => {
            particle.z += particle.speed

            if (particle.z > 15) {
                particle.z = -30
                particle.x = (Math.random() - 0.5) * 18
                particle.y = (Math.random() - 0.5) * 18
            }

            const yBob = Math.sin(t * 2 + particle.wobble) * 0.4
            const xSway = Math.sin(t * 1.5 + particle.x) * 0.2

            dummy.position.set(particle.x + xSway, particle.y + yBob, particle.z)
            dummy.rotation.set(
                (particle.x + t) * particle.rotX,
                (particle.y + t) * particle.rotY,
                (particle.z + t) * particle.rotZ
            )
            dummy.scale.set(particle.scale, particle.scale, particle.scale * 0.35)

            dummy.updateMatrix()
            mesh.current!.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
                color="#b91c1c"
                roughness={0.3}
                metalness={0.15}
                emissive="#7f1d1d"
                emissiveIntensity={0.3}
            />
        </instancedMesh>
    )
}

// White blood cells (fewer, larger, brighter)
function WhiteBloodCells({ count = 30 }) {
    const mesh = useRef<THREE.InstancedMesh>(null)
    const { clock } = useThree()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const particles = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const speed = 0.02 + Math.random() * 0.06
            const x = (Math.random() - 0.5) * 16
            const y = (Math.random() - 0.5) * 16
            const z = (Math.random() - 0.5) * 40
            const scale = 0.8 + Math.random() * 0.5
            const wobble = Math.random() * 3

            temp.push({ speed, x, y, z, scale, wobble })
        }
        return temp
    }, [count])

    useFrame(() => {
        if (!mesh.current) return
        const t = clock.getElapsedTime()

        particles.forEach((particle, i) => {
            particle.z += particle.speed

            if (particle.z > 15) {
                particle.z = -30
                particle.x = (Math.random() - 0.5) * 16
                particle.y = (Math.random() - 0.5) * 16
            }

            const yBob = Math.sin(t * 1.5 + particle.wobble) * 0.6
            const pulse = 1 + Math.sin(t * 3 + particle.wobble) * 0.1

            dummy.position.set(particle.x, particle.y + yBob, particle.z)
            dummy.scale.set(particle.scale * pulse, particle.scale * pulse, particle.scale * pulse)

            dummy.updateMatrix()
            mesh.current!.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
                color="#fef3c7"
                roughness={0.5}
                metalness={0.0}
                emissive="#fef3c7"
                emissiveIntensity={0.5}
                transparent
                opacity={0.6}
            />
        </instancedMesh>
    )
}

function VeinTunnel() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame(({ clock }) => {
        if (meshRef.current) {
            const material = meshRef.current.material as any
            if (material.distort !== undefined) {
                material.distort = 0.3 + Math.sin(clock.getElapsedTime() * 0.5) * 0.15
            }
        }
    })

    return (
        <group rotation={[Math.PI / 2, 0, 0]}>
            <mesh ref={meshRef} position={[0, 0, 0]} scale={[11, 11, 60]}>
                <cylinderGeometry args={[1, 1, 1, 32, 1, true]} />
                <MeshDistortMaterial
                    color="#450a0a"
                    side={THREE.BackSide}
                    distort={0.35}
                    speed={1.5}
                    roughness={0.8}
                />
            </mesh>
        </group>
    )
}

function PulsingLight() {
    const lightRef = useRef<THREE.PointLight>(null)

    useFrame(({ clock }) => {
        if (lightRef.current) {
            const t = clock.getElapsedTime()
            // Heartbeat-like pulsing
            const beat = Math.pow(Math.sin(t * 1.2), 2) * 0.5 + 0.5
            lightRef.current.intensity = 0.5 + beat * 1.5
            lightRef.current.position.z = Math.sin(t * 0.3) * 5
        }
    })

    return <pointLight ref={lightRef} position={[0, 0, 5]} intensity={1} color="#ff4444" distance={30} />
}

function Rig() {
    const { mouse, camera } = useThree()
    useFrame(() => {
        camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.03
        camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.03
        camera.lookAt(0, 0, 0)
    })
    return null
}

export default function VeinFlowScene() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-black">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ antialias: false }}>
                <fog attach="fog" args={['#1a0505', 5, 40]} />
                <color attach="background" args={['#1a0505']} />

                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={0.8} color="#ff8888" />
                <pointLight position={[-10, -10, -5]} intensity={0.4} color="#ff0000" />
                <PulsingLight />

                <VeinTunnel />
                <BloodCells count={350} />
                <WhiteBloodCells count={25} />

                <Sparkles
                    count={150}
                    scale={20}
                    size={3}
                    speed={0.3}
                    opacity={0.4}
                    color="#ffcccc"
                />

                <Float speed={0.5} rotationIntensity={0} floatIntensity={0.3}>
                    <Sparkles
                        count={50}
                        scale={15}
                        size={6}
                        speed={0.2}
                        opacity={0.2}
                        color="#ff6666"
                    />
                </Float>

                <Rig />

                <EffectComposer>
                    <Bloom
                        luminanceThreshold={0.2}
                        mipmapBlur
                        intensity={1.8}
                        radius={0.5}
                    />
                    <Vignette eskil={false} offset={0.1} darkness={1.2} />
                </EffectComposer>
            </Canvas>
        </div>
    )
}
