'use client'

import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import Link from 'next/link'

// 3D Scene Component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3b82f6" />
      
      {/* Floating geometric shapes */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh position={[-3, 2, 0]} rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial 
            color="#3b82f6" 
            transparent 
            opacity={0.7} 
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.7}>
        <mesh position={[3, -1, -2]} rotation={[0.3, 0.3, 0]}>
          <sphereGeometry args={[0.6]} />
          <meshStandardMaterial 
            color="#8b5cf6" 
            transparent 
            opacity={0.8} 
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[0, -2, 1]} rotation={[0.8, 0.2, 0.5]}>
          <cylinderGeometry args={[0.4, 0.4, 1.2]} />
          <meshStandardMaterial 
            color="#06b6d4" 
            transparent 
            opacity={0.6} 
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      </Float>

      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  )
}

export default function Hero() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">Jack Simpson</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed">
            Creating interactive experiences at the intersection of{' '}
            <span className="text-primary font-semibold">3D visualization</span>,{' '}
            <span className="text-secondary font-semibold">AI</span>, and{' '}
            <span className="text-accent font-semibold">robotics</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/projects"
            className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25 min-w-[200px]"
          >
            View My Work
          </Link>
          <Link
            href="/experiments"
            className="px-8 py-4 glass border border-glass-border text-text hover:text-primary rounded-xl font-semibold hover:scale-105 transition-all duration-300 min-w-[200px]"
          >
            Browse Experiments
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">15+</div>
            <div className="text-text-secondary">Interactive Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">8</div>
            <div className="text-text-secondary">AI Experiments</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold gradient-text mb-2">3</div>
            <div className="text-text-secondary">Robotics Systems</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center">
          <div className="w-1 h-3 bg-text-muted rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </div>
  )
}