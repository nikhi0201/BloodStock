'use client'
import { createContext, useContext } from 'react'
import type { Map } from 'mapbox-gl'

export const MapContext = createContext<Map | null>(null)

export const useMap = () => {
    const context = useContext(MapContext)
    // It's okay to return null if map isn't ready
    return context
}
