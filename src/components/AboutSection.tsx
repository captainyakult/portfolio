'use client'

import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Suspense } from 'react'

function BackgroundScene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={0.4} color="#3b82f6" />
      
      {/* Subtle floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random()} rotationIntensity={0.2} floatIntensity={0.3}>
          <mesh
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10
            ]}
          >
            <sphereGeometry args={[0.05 + Math.random() * 0.1]} />
            <meshStandardMaterial 
              color={i % 3 === 0 ? "#3b82f6" : i % 3 === 1 ? "#8b5cf6" : "#06b6d4"} 
              transparent 
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

export default function AboutSection() {
  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "Three.js", "TypeScript", "WebGL"] },
    { category: "3D & Graphics", items: ["React Three Fiber", "Blender", "Unity", "OpenGL", "Shaders"] },
    { category: "AI/ML", items: ["TensorFlow", "PyTorch", "Computer Vision", "NLP", "Reinforcement Learning"] },
    { category: "Robotics", items: ["ROS", "Arduino", "Raspberry Pi", "Sensor Fusion", "Control Systems"] },
  ]

  return (
    <div className="relative min-h-screen py-20">
      {/* Background 3D Scene */}
      <div className="absolute inset-0 opacity-10">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <Suspense fallback={null}>
            <BackgroundScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            I'm passionate about creating immersive digital experiences that bridge the gap 
            between imagination and reality through cutting-edge technology.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Story */}
          <div className="glass border border-glass-border rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-text">My Journey</h3>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                My fascination with interactive technology began during my studies in computer science, 
                where I discovered the power of combining visual creativity with technical precision.
              </p>
              <p>
                I specialize in creating web-based 3D experiences, developing AI-powered applications, 
                and building robotic systems that respond intelligently to their environment.
              </p>
              <p>
                When I'm not coding, you'll find me experimenting with new technologies, contributing 
                to open-source projects, or exploring the latest developments in machine learning and 
                computer graphics.
              </p>
            </div>
          </div>

          {/* Philosophy */}
          <div className="glass border border-glass-border rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-text">Philosophy</h3>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                I believe that the best technology feels magical – it works seamlessly, 
                responds intuitively, and enhances human capabilities without getting in the way.
              </p>
              <p>
                Every project I work on aims to push the boundaries of what's possible in 
                the browser while maintaining accessibility and performance.
              </p>
              <p>
                My approach combines rigorous technical implementation with user-centered design, 
                ensuring that complex systems remain approachable and engaging.
              </p>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillGroup, index) => (
            <div 
              key={skillGroup.category}
              className="glass border border-glass-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
            >
              <h4 className="text-lg font-semibold mb-4 text-primary">
                {skillGroup.category}
              </h4>
              <ul className="space-y-2">
                {skillGroup.items.map((skill) => (
                  <li key={skill} className="text-text-secondary text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}