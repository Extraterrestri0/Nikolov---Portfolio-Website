import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function Globe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    globe: THREE.Mesh;
    marker: THREE.Mesh;
  }>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create globe
    const sphereGeometry = new THREE.SphereGeometry(5, 50, 50);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x2c5282, // dark blue
      transparent: true,
      opacity: 0.8,
      wireframe: false,
    });
    const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(globe);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Create marker for Sofia, Bulgaria
    // Sofia coordinates: latitude: 42.6977° N, longitude: 23.3219° E
    const markerGeometry = new THREE.SphereGeometry(0.2, 32, 32);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    
    // Convert Sofia's coordinates to 3D position
    const latitude = 42.6977 * (Math.PI / 180);
    const longitude = 23.3219 * (Math.PI / 180);
    const radius = 5;
    
    marker.position.x = radius * Math.cos(latitude) * Math.sin(longitude);
    marker.position.y = radius * Math.sin(latitude);
    marker.position.z = radius * Math.cos(latitude) * Math.cos(longitude);
    
    scene.add(marker);

    // Position camera
    camera.position.z = 15;

    // Animation
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Rotate globe
      globe.rotation.y += 0.002;
      marker.rotation.y += 0.002;
      
      renderer.render(scene, camera);
    };

    animate();

    // Store references
    globeRef.current = {
      scene,
      camera,
      renderer,
      globe,
      marker,
    };

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !globeRef.current) return;
      
      const { camera, renderer } = globeRef.current;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[300px] rounded-lg overflow-hidden shadow-md bg-gray-900"
    />
  );
}