'use client'

import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import projectsDataRaw from '@/data/projects.json'
import type { Project } from '@/types'

const projectsData = projectsDataRaw as Project[]

function ProjectScene({ project }: { project: Project }) {
  const colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981"]
  
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, 5]} intensity={0.4} color="#8b5cf6" />
        
        {/* Dynamic 3D elements based on technologies */}
        {project.technologies.slice(0, 5).map((tech, index) => (
          <Float 
            key={tech} 
            speed={1 + index * 0.3} 
            rotationIntensity={0.4} 
            floatIntensity={0.6}
          >
            <group
              position={[
                Math.cos((index / 5) * Math.PI * 2) * 4,
                Math.sin((index / 5) * Math.PI * 2) * 4,
                (Math.random() - 0.5) * 6
              ]}
            >
              {index % 3 === 0 ? (
                <mesh>
                  <boxGeometry args={[0.8, 0.8, 0.8]} />
                  <meshStandardMaterial 
                    color={colors[index % colors.length]}
                    transparent 
                    opacity={0.8}
                    roughness={0.2}
                    metalness={0.8}
                  />
                </mesh>
              ) : index % 3 === 1 ? (
                <mesh>
                  <sphereGeometry args={[0.5]} />
                  <meshStandardMaterial 
                    color={colors[index % colors.length]}
                    transparent 
                    opacity={0.7}
                    roughness={0.1}
                    metalness={0.9}
                  />
                </mesh>
              ) : (
                <mesh>
                  <cylinderGeometry args={[0.3, 0.3, 1]} />
                  <meshStandardMaterial 
                    color={colors[index % colors.length]}
                    transparent 
                    opacity={0.6}
                    roughness={0.3}
                    metalness={0.7}
                  />
                </mesh>
              )}
            </group>
          </Float>
        ))}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  )
}

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectsData.find(p => p.id === params.id)
  
  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/projects"
            className="inline-flex items-center text-text-secondary hover:text-primary transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Projects
          </Link>
        </div>

        {/* Project Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="mb-6">
              {project.featured && (
                <span className="inline-block px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-sm font-semibold rounded-full mb-4">
                  Featured Project
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                {project.title}
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Project Meta */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-sm text-text-muted">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Completed: {new Date(project.completedDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {project.demoLink && (
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/25 text-center"
                >
                  View Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 glass border border-glass-border text-text hover:text-primary rounded-xl font-semibold hover:scale-105 transition-all duration-300 text-center"
                >
                  View on GitHub
                </a>
              )}
            </div>
          </div>

          {/* 3D Visualization */}
          <div className="relative h-96 lg:h-[500px]">
            <div className="absolute inset-0 glass border border-glass-border rounded-2xl overflow-hidden">
              <ProjectScene project={project} />
            </div>
          </div>
        </div>

        {/* Technologies Used */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-text">Technologies Used</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {project.technologies.map((tech, index) => (
              <div 
                key={tech}
                className="glass border border-glass-border rounded-xl p-4 text-center hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <div className="text-2xl mb-2">
                  {/* Simple tech icon mapping */}
                  {tech.toLowerCase().includes('react') ? '⚛️' :
                   tech.toLowerCase().includes('next') ? '▲' :
                   tech.toLowerCase().includes('three') ? '🎲' :
                   tech.toLowerCase().includes('typescript') ? '📘' :
                   tech.toLowerCase().includes('python') ? '🐍' :
                   tech.toLowerCase().includes('ai') || tech.toLowerCase().includes('ml') ? '🤖' :
                   tech.toLowerCase().includes('webgl') ? '🎨' :
                   '⚡'}
                </div>
                <div className="text-sm font-medium text-text">{tech}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Images Placeholder */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-text">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images.map((image, index) => (
              <div 
                key={index}
                className="aspect-video bg-gradient-to-br from-surface to-surface-secondary rounded-xl flex items-center justify-center"
              >
                <div className="text-center text-text-muted">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p className="text-sm">Image {index + 1}</p>
                  <p className="text-xs opacity-50">{image}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Projects */}
        <div className="border-t border-glass-border pt-16">
          <h2 className="text-3xl font-bold mb-8 text-text text-center">More Projects</h2>
          <div className="flex justify-center">
            <Link
              href="/projects"
              className="px-8 py-4 glass border border-glass-border text-text hover:text-primary rounded-xl font-semibold hover:scale-105 transition-all duration-300"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}