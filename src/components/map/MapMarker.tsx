'use client'
import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import { useMap } from './MapContext'

interface MapMarkerProps {
    lat: number
    lng: number
    type?: 'donor' | 'hospital' | 'request'
    bloodGroup?: string
    onClick?: () => void
}

export default function MapMarker({ lat, lng, type = 'donor', bloodGroup, onClick }: MapMarkerProps) {
    const map = useMap()
    const markerRef = useRef<mapboxgl.Marker | null>(null)

    useEffect(() => {
        if (!map) return

        // Create custom element
        const el = document.createElement('div')

        // Style based on type
        const colorClass = type === 'donor' ? 'bg-red-500 shadow-red-500/50' : type === 'hospital' ? 'bg-blue-500 shadow-blue-500/50' : 'bg-yellow-500 shadow-yellow-500/50'

        el.className = `w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer ${colorClass} flex items-center justify-center text-[10px] font-bold text-white transition-transform hover:scale-125`

        if (bloodGroup) {
            el.innerText = bloodGroup
        }

        // Add pulse animation wrapper if needed, or just CSS class
        // For now simple circle

        const marker = new mapboxgl.Marker(el)
            .setLngLat([lng, lat])
            .addTo(map)

        markerRef.current = marker

        if (onClick) {
            el.addEventListener('click', onClick)
        }

        return () => {
            marker.remove()
            if (onClick) el.removeEventListener('click', onClick)
        }
    }, [map, lat, lng, type, bloodGroup, onClick])

    return null
}
