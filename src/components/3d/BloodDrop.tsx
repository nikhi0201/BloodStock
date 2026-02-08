"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

export function BloodDrop() {
    const meshRef = useRef<THREE.Mesh>(null)
    const glowRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            const t = state.clock.getElapsedTime()
            // Heartbeat-like pulsing
            const heartbeat = Math.pow(Math.sin(t * 1.2), 2) * 0.08
            meshRef.current.position.y = Math.sin(t * 0.5) * 0.2
            meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.1
            meshRef.current.scale.setScalar(1.5 + heartbeat)
        }
        if (glowRef.current) {
            const t = state.clock.getElapsedTime()
            const pulse = 1 + Math.sin(t * 1.2) * 0.15
            glowRef.current.scale.setScalar(2 * pulse)
        }
    })

    return (
        <group>
            {/* Main blood drop */}
            <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
                <MeshDistortMaterial
                    color="#8B0000"
                    roughness={0.08}
                    metalness={0.15}
                    transmission={0.15}
                    distort={0.45}
                    speed={2.5}
                />
            </Sphere>

            {/* Inner glow */}
            <Sphere ref={glowRef} args={[1, 32, 32]} scale={2}>
                <meshStandardMaterial
                    color="#ff0000"
                    transparent
                    opacity={0.05}
                    emissive="#ff0000"
                    emissiveIntensity={0.5}
                />
            </Sphere>

            {/* Core light */}
            <pointLight position={[0, 0, 0]} intensity={2} color="#ff2222" distance={8} decay={2} />
        </group>
    )
}
