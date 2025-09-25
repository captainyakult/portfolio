'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { Suspense } from 'react'
import projectsDataRaw from '@/data/projects.json'
import type { Project } from '@/types'

const projectsData = projectsDataRaw as Project[]

function ProjectCard3D({ project, index }: { project: Project, index: number }) {
  return (
    <div className="relative h-80 group cursor-pointer">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.3} />
            <pointLight position={[5, 5, 5]} intensity={0.5} />
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
              <mesh
                position={[0, 0, 0]} 
                rotation={[0.2, 0.2, 0]}
              >
                <boxGeometry args={[2, 2, 0.2]} />
                <meshStandardMaterial 
                  color={index % 3 === 0 ? "#3b82f6" : index % 3 === 1 ? "#8b5cf6" : "#06b6d4"}
                  transparent 
                  opacity={0.7}
                  roughness={0.2}
                  metalness={0.8}
                />
              </mesh>
            </Float>
          </Suspense>
        </Canvas>
      </div>

      {/* Card Content */}
      <div className="relative h-full glass border border-glass-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 group-hover:scale-105">
        <div className="flex flex-col h-full">
          {/* Project Image Placeholder */}
          <div className="w-full h-32 bg-gradient-to-br from-surface to-surface-secondary rounded-lg mb-4 flex items-center justify-center">
            <div className="text-4xl opacity-50">
              {project.title.split(' ').map(word => word[0]).join('').slice(0, 2)}
            </div>
          </div>

          {/* Project Info */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2 text-text group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-text-secondary text-sm mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 3).map((tech) => (
                <span 
                  key={tech}
                  className="px-2 py-1 text-xs bg-surface-secondary text-text-secondary rounded-md"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 text-xs bg-surface-secondary text-text-muted rounded-md">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-auto">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/80 transition-colors text-center"
                onClick={(e) => e.stopPropagation()}
              >
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-2 glass border border-glass-border text-text-secondary text-sm rounded-lg hover:text-text transition-colors text-center"
                onClick={(e) => e.stopPropagation()}
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedWork() {
  const featuredProjects = projectsData.filter(project => project.featured)

  return (
    <div className="relative py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Featured Work</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
            A selection of projects that showcase my expertise in 3D visualization, 
            AI integration, and interactive web technologies.
          </p>
          <Link 
            href="/projects"
            className="inline-flex items-center text-primary hover:text-secondary transition-colors"
          >
            <span>View all projects</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
            <Link key={project.id} href={`/projects/${project.id}`}>
              <ProjectCard3D project={project} index={index} />
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="glass border border-glass-border rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold mb-4">Interested in working together?</h3>
            <p className="text-text-secondary mb-6">
              I'm always excited to collaborate on innovative projects that push the boundaries 
              of what's possible with modern web technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@jacksimpson.dev"
                className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:scale-105 transition-transform"
              >
                Get in Touch
              </a>
              <Link
                href="/resume.pdf"
                target="_blank"
                className="px-6 py-3 glass border border-glass-border text-text hover:text-primary rounded-lg hover:scale-105 transition-all"
              >
                View Resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}