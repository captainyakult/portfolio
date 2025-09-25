'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Suspense } from 'react'
import experimentsDataRaw from '@/data/experiments.json'
import type { Experiment } from '@/types'

const experimentsData = experimentsDataRaw as Experiment[]

// 3D Scene for experiment cards
function ExperimentScene({ experiment, isHovered }: { experiment: Experiment, isHovered: boolean }) {
  const getColorByType = (type: Experiment['type']) => {
    switch (type) {
      case 'AI': return '#3b82f6'
      case 'ML': return '#8b5cf6' 
      case 'Robotics': return '#ef4444'
      case 'WebGL': return '#06b6d4'
      case '3D': return '#10b981'
      case 'Research': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  const color = getColorByType(experiment.type)

  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-5, -5, 5]} intensity={0.3} color={color} />
        
        <Float speed={isHovered ? 2.5 : 1.5} rotationIntensity={0.4} floatIntensity={0.5}>
          <group>
            {experiment.type === 'AI' && (
              <mesh>
                <boxGeometry args={[1.5, 1.5, 0.3]} />
                <meshStandardMaterial 
                  color={color}
                  transparent 
                  opacity={0.8}
                  roughness={0.2}
                  metalness={0.8}
                />
              </mesh>
            )}
            {experiment.type === 'ML' && (
              <mesh>
                <sphereGeometry args={[1]} />
                <meshStandardMaterial 
                  color={color}
                  transparent 
                  opacity={0.7}
                  roughness={0.1}
                  metalness={0.9}
                />
              </mesh>
            )}
            {experiment.type === 'Robotics' && (
              <mesh>
                <cylinderGeometry args={[0.8, 0.8, 1.5]} />
                <meshStandardMaterial 
                  color={color}
                  transparent 
                  opacity={0.8}
                  roughness={0.3}
                  metalness={0.7}
                />
              </mesh>
            )}
            {(experiment.type === 'WebGL' || experiment.type === '3D') && (
              <mesh>
                <torusGeometry args={[1.2, 0.3, 16, 100]} />
                <meshStandardMaterial 
                  color={color}
                  transparent 
                  opacity={0.7}
                  roughness={0.2}
                  metalness={0.8}
                />
              </mesh>
            )}
            {experiment.type === 'Research' && (
              <mesh>
                <octahedronGeometry args={[1.2]} />
                <meshStandardMaterial 
                  color={color}
                  transparent 
                  opacity={0.8}
                  roughness={0.2}
                  metalness={0.8}
                />
              </mesh>
            )}
          </group>
        </Float>
      </Suspense>
    </Canvas>
  )
}

function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const [isHovered, setIsHovered] = useState(false)
  
  const getStatusColor = (status: Experiment['status']) => {
    switch (status) {
      case 'active': return 'bg-primary'
      case 'completed': return 'bg-success'
      case 'paused': return 'bg-warning'
      default: return 'bg-text-muted'
    }
  }

  const getTypeIcon = (type: Experiment['type']) => {
    switch (type) {
      case 'AI': return '🤖'
      case 'ML': return '🧠'
      case 'Robotics': return '🦾'
      case 'WebGL': return '🎨'
      case '3D': return '🎲'
      case 'Research': return '🔬'
      default: return '⚡'
    }
  }

  return (
    <div 
      className="relative group h-[450px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-all duration-700 rounded-2xl overflow-hidden">
        <ExperimentScene experiment={experiment} isHovered={isHovered} />
      </div>

      {/* Card Content */}
      <div className="relative h-full glass border border-glass-border hover:border-primary/50 transition-all duration-500 group-hover:scale-[1.02] p-6 rounded-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{getTypeIcon(experiment.type)}</div>
            <div>
              <span className="px-3 py-1 bg-surface-secondary text-text-secondary text-xs rounded-full">
                {experiment.type}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(experiment.status)}`} />
            <span className="text-xs text-text-muted capitalize">{experiment.status}</span>
          </div>
        </div>

        {/* Title and Description */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-text group-hover:text-primary transition-colors">
            {experiment.name}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
            {experiment.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {experiment.technologies.slice(0, 4).map((tech) => (
              <span 
                key={tech}
                className="px-2 py-1 text-xs bg-surface text-text-secondary rounded border border-glass-border"
              >
                {tech}
              </span>
            ))}
            {experiment.technologies.length > 4 && (
              <span className="px-2 py-1 text-xs bg-surface text-text-muted rounded border border-glass-border">
                +{experiment.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Media Preview */}
        <div className="mb-4 flex-1">
          {experiment.media.length > 0 && (
            <div className="bg-surface-secondary rounded-lg p-4 h-24 flex items-center justify-center">
              <div className="text-center text-text-muted">
                <div className="text-2xl mb-1">
                  {experiment.media[0].type === 'video' ? '🎥' : 
                   experiment.media[0].type === 'gif' ? '🎬' : '📸'}
                </div>
                <p className="text-xs">{experiment.media.length} media file{experiment.media.length > 1 ? 's' : ''}</p>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {experiment.results && (
          <div className="mb-4 p-3 bg-surface-secondary border border-glass-border rounded-lg">
            <p className="text-xs text-text-secondary line-clamp-2">
              <span className="font-semibold text-primary">Results: </span>
              {experiment.results}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="text-xs text-text-muted">
          Started: {new Date(experiment.startDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short' 
          })}
        </div>
      </div>
    </div>
  )
}

export default function ExperimentsPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'paused' | Experiment['type']>('all')

  const filteredExperiments = experimentsData.filter(experiment => {
    if (filter === 'all') return true
    if (filter === 'active' || filter === 'completed' || filter === 'paused') {
      return experiment.status === filter
    }
    return experiment.type === filter
  })

  const filterOptions = [
    { key: 'all', label: 'All', count: experimentsData.length },
    { key: 'active', label: 'Active', count: experimentsData.filter(e => e.status === 'active').length },
    { key: 'completed', label: 'Completed', count: experimentsData.filter(e => e.status === 'completed').length },
    { key: 'AI', label: 'AI', count: experimentsData.filter(e => e.type === 'AI').length },
    { key: 'ML', label: 'ML', count: experimentsData.filter(e => e.type === 'ML').length },
    { key: 'Robotics', label: 'Robotics', count: experimentsData.filter(e => e.type === 'Robotics').length },
    { key: '3D', label: '3D/WebGL', count: experimentsData.filter(e => e.type === '3D' || e.type === 'WebGL').length },
  ] as const

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Experiments</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Ongoing research and experimental projects exploring the cutting edge of 
            AI, machine learning, robotics, and interactive technologies.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="glass border border-glass-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold gradient-text mb-1">
              {experimentsData.filter(e => e.status === 'active').length}
            </div>
            <div className="text-sm text-text-secondary">Active</div>
          </div>
          <div className="glass border border-glass-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold gradient-text mb-1">
              {experimentsData.filter(e => e.status === 'completed').length}
            </div>
            <div className="text-sm text-text-secondary">Completed</div>
          </div>
          <div className="glass border border-glass-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold gradient-text mb-1">
              {new Set(experimentsData.flatMap(e => e.technologies)).size}
            </div>
            <div className="text-sm text-text-secondary">Technologies</div>
          </div>
          <div className="glass border border-glass-border rounded-xl p-4 text-center">
            <div className="text-2xl font-bold gradient-text mb-1">
              {experimentsData.reduce((acc, e) => acc + e.media.length, 0)}
            </div>
            <div className="text-sm text-text-secondary">Media Files</div>
          </div>
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

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredExperiments.map((experiment) => (
            <ExperimentCard key={experiment.id} experiment={experiment} />
          ))}
        </div>

        {/* Empty State */}
        {filteredExperiments.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4 opacity-50">🧪</div>
            <h3 className="text-2xl font-semibold mb-2">No experiments found</h3>
            <p className="text-text-secondary">Try adjusting your filter to see more experiments.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="glass border border-glass-border rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Have an idea for collaboration?</h3>
            <p className="text-text-secondary mb-6">
              I'm always interested in exploring new research directions and 
              collaborating on innovative projects.
            </p>
            <a
              href="mailto:hello@jacksimpson.dev"
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:scale-105 transition-transform duration-300 inline-block"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}