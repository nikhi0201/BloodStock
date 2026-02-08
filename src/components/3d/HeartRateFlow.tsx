"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Line } from "@react-three/drei"
import * as THREE from "three"

export function HeartRateFlow() {
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
                // Create an ECG-like wave moving across
                const x = (i - 50) * 0.5
                // Basic moving sine wave
                // let y = Math.sin(x + t) * 0.5

                // ECG spike simulation (moving window)
                const phase = (i + t * 4) % 100
                let y = 0

                // P-wave
                if (phase > 10 && phase < 20) y += Math.sin((phase - 10) * Math.PI / 10) * 0.2
                // QRS complex
                if (phase > 25 && phase < 35) {
                    if (phase < 28) y -= 0.2
                    else if (phase < 32) y += 1.5
                    else y -= 0.5
                }
                // T-wave
                if (phase > 40 && phase < 55) y += Math.sin((phase - 40) * Math.PI / 15) * 0.3

                // Update Y position (index * 3 + 1)
                positions[i * 3 + 1] = y * 0.5
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
            position={[0, -2, -5]} // Positioned below and behind
            transparent
            opacity={0.6}
        />
    )
}
