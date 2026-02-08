'use client'

import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MapContext } from './MapContext'

// Default to empty string if not set, user must provide token
const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ''
mapboxgl.accessToken = token

interface MapboxMapProps {
    initialLat?: number
    initialLng?: number
    initialZoom?: number
    children?: React.ReactNode
}

export default function MapboxMap({
    initialLat = 12.9716,
    initialLng = 77.5946,
    initialZoom = 12,
    children
}: MapboxMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const [mapInstance, setMapInstance] = useState<mapboxgl.Map | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (map.current) return // initialize map only once
        if (!mapContainer.current) return

        if (!token) {
            setError('Mapbox token not found. Please set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local')
            return
        }

        try {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/dark-v11',
                center: [initialLng, initialLat],
                zoom: initialZoom,
                pitch: 60, // 3D perspective
                bearing: -17.6,
                antialias: true
            })

            map.current.on('style.load', () => {
                // Insert the layer beneath any symbol layer.
                const layers = map.current?.getStyle()?.layers
                const labelLayerId = layers?.find(
                    (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
                )?.id

                // The 'building' layer in the Mapbox Streets vector source contains building height data
                // from OpenStreetMap.
                map.current?.addLayer(
                    {
                        'id': 'add-3d-buildings',
                        'source': 'composite',
                        'source-layer': 'building',
                        'filter': ['==', 'extrude', 'true'],
                        'type': 'fill-extrusion',
                        'minzoom': 15,
                        'paint': {
                            'fill-extrusion-color': '#aaa',
                            'fill-extrusion-height': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'height']
                            ],
                            'fill-extrusion-base': [
                                'interpolate',
                                ['linear'],
                                ['zoom'],
                                15,
                                0,
                                15.05,
                                ['get', 'min_height']
                            ],
                            'fill-extrusion-opacity': 0.6
                        }
                    },
                    labelLayerId
                )
            })

            setMapInstance(map.current)

        } catch (err) {
            setError('Failed to initialize map')
            console.error(err)
        }

    }, [initialLat, initialLng, initialZoom])

    if (error) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-slate-900 text-red-500">
                <p>{error}</p>
            </div>
        )
    }

    return (
        <div className="relative h-full w-full">
            <div ref={mapContainer} className="h-full w-full" />
            {mapInstance && (
                <MapContext.Provider value={mapInstance}>
                    {children}
                </MapContext.Provider>
            )}
        </div>
    )
}
