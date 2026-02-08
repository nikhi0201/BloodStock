"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Sparkles } from "@react-three/drei"
import { BloodDrop } from "./BloodDrop"
import { HeartRateFlow } from "./HeartRateFlow"
import { Suspense, useRef } from "react"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import * as THREE from "three"

function FloatingOrbs({ count = 50 }) {
    const mesh = useRef<THREE.InstancedMesh>(null)
    const dummy = new THREE.Object3D()

    const particles = Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 20,
        y: (Math.random() - 0.5) * 15,
        z: (Math.random() - 0.5) * 10 - 5,
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        scale: 0.05 + Math.random() * 0.15,
    }))

    useFrame(({ clock }) => {
        if (!mesh.current) return
        const t = clock.getElapsedTime()

        particles.forEach((p, i) => {
            dummy.position.set(
                p.x + Math.sin(t * p.speed + p.offset) * 0.5,
                p.y + Math.cos(t * p.speed * 0.7 + p.offset) * 0.5,
                p.z
            )
            const pulse = p.scale * (1 + Math.sin(t * 2 + p.offset) * 0.3)
            dummy.scale.setScalar(pulse)
            dummy.updateMatrix()
            mesh.current!.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial
                color="#dc2626"
                emissive="#dc2626"
                emissiveIntensity={2}
                transparent
                opacity={0.6}
                toneMapped={false}
            />
        </instancedMesh>
    )
}

export default function BackgroundScene() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <Suspense fallback={null}>
                    <fog attach="fog" args={['#0a0a0a', 5, 25]} />
                    <color attach="background" args={['#0a0a0a']} />

                    <ambientLight intensity={0.3} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} />
                    <pointLight position={[-10, -10, -10]} intensity={0.3} color="#ff0000" />
                    <pointLight position={[0, 0, 5]} intensity={0.5} color="#ff4444" />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <BloodDrop />
                    </Float>

                    <HeartRateFlow />
                    <FloatingOrbs count={40} />

                    <Sparkles
                        count={100}
                        scale={15}
                        size={2}
                        speed={0.3}
                        opacity={0.3}
                        color="#ff6666"
                    />

                    <Environment preset="city" />

                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0.3}
                            mipmapBlur
                            intensity={1.2}
                            radius={0.4}
                        />
                        <Vignette eskil={false} offset={0.1} darkness={0.8} />
                    </EffectComposer>
                </Suspense>
            </Canvas>
        </div>
    )
}
