'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import projectsDataRaw from '@/data/projects.json'
import type { Project } from '@/types'

const projectsData = projectsDataRaw as Project[]

// 3D Portal Component for project transitions
function ProjectPortal({ project, index, isHovered }: { project: Project, index: number, isHovered: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color="#8b5cf6" />
        
        <Float speed={isHovered ? 3 : 1.5} rotationIntensity={isHovered ? 0.8 : 0.3}>
          <group>
            {/* Main portal ring */}
            <mesh rotation={[0, 0, 0]}>
              <torusGeometry args={[2, 0.1, 16, 100]} />
              <meshStandardMaterial 
                color={index % 3 === 0 ? "#3b82f6" : index % 3 === 1 ? "#8b5cf6" : "#06b6d4"}
                emissive={index % 3 === 0 ? "#1e40af" : index % 3 === 1 ? "#7c3aed" : "#0891b2"}
                emissiveIntensity={isHovered ? 0.3 : 0.1}
              />
            </mesh>
            
            {/* Floating particles */}
            {Array.from({ length: 6 }).map((_, i) => (
              <Float key={i} speed={2 + i * 0.5} rotationIntensity={0.2}>
                <mesh
                  position={[
                    Math.cos((i / 6) * Math.PI * 2) * 3,
                    Math.sin((i / 6) * Math.PI * 2) * 3,
                    (Math.random() - 0.5) * 2
                  ]}
                >
                  <sphereGeometry args={[0.1]} />
                  <meshStandardMaterial 
                    color="#ffffff"
                    transparent 
                    opacity={0.8}
                    emissive="#ffffff"
                    emissiveIntensity={0.2}
                  />
                </mesh>
              </Float>
            ))}
          </group>
        </Float>
      </Suspense>
    </Canvas>
  )
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/projects/${project.id}`}>
      <div 
        className="relative group h-96 cursor-pointer overflow-hidden rounded-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 3D Portal Background */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-all duration-700">
          <ProjectPortal project={project} index={index} isHovered={isHovered} />
        </div>

        {/* Card Content */}
        <div className="relative h-full glass border border-glass-border hover:border-primary/50 transition-all duration-500 group-hover:scale-[1.02] p-6 flex flex-col">
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold rounded-full">
                Featured
              </span>
            </div>
          )}

          {/* Project Header */}
          <div className="mb-4">
            <h3 className="text-2xl font-bold mb-2 text-text group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex-1 mb-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 text-xs bg-surface-secondary text-text-secondary rounded-lg border border-glass-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto">
            <div className="text-sm text-text-muted">
              Completed: {new Date(project.completedDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short' 
              })}
            </div>
            <div className="flex gap-2">
              {project.demoLink && (
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
              {project.githubLink && (
                <div className="w-2 h-2 bg-secondary rounded-full" />
              )}
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
        </div>
      </div>
    </Link>
  )
}

function ProjectsContent() {
  const searchParams = useSearchParams()
  const showFeatured = searchParams.get('featured') === 'true'
  
  const [filter, setFilter] = useState<'all' | 'featured' | 'web' | 'ai' | 'robotics'>(
    showFeatured ? 'featured' : 'all'
  )

  const filteredProjects = projectsData.filter(project => {
    if (filter === 'all') return true
    if (filter === 'featured') return project.featured
    if (filter === 'web') return project.technologies.some(tech => 
      ['React', 'Next.js', 'JavaScript', 'TypeScript', 'WebGL', 'Three.js'].includes(tech)
    )
    if (filter === 'ai') return project.technologies.some(tech => 
      ['AI', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Computer Vision'].includes(tech)
    )
    if (filter === 'robotics') return project.technologies.some(tech => 
      ['ROS', 'Arduino', 'Robotics', 'Hardware'].includes(tech)
    )
    return true
  })

  const filterOptions = [
    { key: 'all', label: 'All Projects', count: projectsData.length },
    { key: 'featured', label: 'Featured', count: projectsData.filter(p => p.featured).length },
    { key: 'web', label: 'Web & 3D', count: projectsData.filter(p => 
      p.technologies.some(tech => ['React', 'Next.js', 'JavaScript', 'TypeScript', 'WebGL', 'Three.js'].includes(tech))
    ).length },
    { key: 'ai', label: 'AI/ML', count: projectsData.filter(p => 
      p.technologies.some(tech => ['AI', 'TensorFlow', 'PyTorch', 'Machine Learning'].includes(tech))
    ).length },
    { key: 'robotics', label: 'Robotics', count: projectsData.filter(p => 
      p.technologies.some(tech => ['ROS', 'Arduino', 'Robotics'].includes(tech))
    ).length },
  ] as const

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Exploring the intersection of creativity and technology through interactive experiences, 
            AI-powered applications, and innovative web solutions.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterOptions.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key as typeof filter)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                filter === key
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                  : 'glass border border-glass-border text-text-secondary hover:text-text hover:border-primary/50'
              }`}
            >
              {label} <span className="opacity-75">({count})</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-50">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No projects found</h3>
            <p className="text-text-secondary">Try adjusting your filter to see more projects.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    }>
      <ProjectsContent />
    </Suspense>
  )
}