// Hero Section Animations and Effects
class HeroAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.createParticleBackground();
    this.initTextAnimations();
    this.initScrollAnimations();
    this.createCustomCursor();
    this.initInteractiveChart();
  }

  // Animated Particle Background
  createParticleBackground() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.8 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#CDDC39';
        ctx.fill();
      }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        
        // Connect nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.globalAlpha = 0.2 * (1 - distance / 100);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#CDDC39';
            ctx.stroke();
          }
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };

    animate();
  }

  // Text animations DISABLED for clean header design
  initTextAnimations() {
    // All text animations disabled - header should be clean
    // Only rolling industry text animation is allowed
    return;
  }

  // Scroll-triggered Animations
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
      observer.observe(section);
    });
  }

  // Custom Cursor
  createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const animateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
      
      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    // Hover effects
    document.querySelectorAll('a, button, .btn').forEach(element => {
      element.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
      });
      element.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
      });
    });
  }

  // 3D Network Visualization - Shows Revenue Infrastructure
  initInteractiveChart() {
    const container = document.getElementById('network-canvas-container');
    if (!container || !window.THREE) return;

    // Initialize Three.js scene with brand colors
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: document.getElementById('network-canvas'),
      antialias: true,
      alpha: true 
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Position camera
    camera.position.z = 50;
    camera.position.y = 10;
    camera.lookAt(0, 0, 0);

    // Create nodes with brand colors
    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const primaryNodeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xCDDC39, // Brand lime green
      emissive: 0xCDDC39,
      emissiveIntensity: 0.3,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    
    const secondaryNodeMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x00D4AA, // Brand teal
      emissive: 0x00D4AA,
      emissiveIntensity: 0.2,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    });

    // Create 25 nodes in strategic 3D formation
    for (let i = 0; i < 25; i++) {
      const isPrimary = i < 8; // First 8 are primary nodes
      const material = isPrimary ? primaryNodeMaterial.clone() : secondaryNodeMaterial.clone();
      const node = new THREE.Mesh(nodeGeometry, material);
      
      node.position.x = (Math.random() - 0.5) * 35;
      node.position.y = (Math.random() - 0.5) * 18;
      node.position.z = (Math.random() - 0.5) * 25;
      node.userData = {
        pulseOffset: Math.random() * Math.PI * 2,
        baseScale: isPrimary ? 1.2 : 0.7 + Math.random() * 0.3,
        isPrimary: isPrimary,
        connections: []
      };
      scene.add(node);
      nodes.push(node);
    }

    // Create connections with brand colors
    const primaryConnectionMaterial = new THREE.LineBasicMaterial({ 
      color: 0xCDDC39, 
      opacity: 0.4,
      transparent: true
    });
    
    const secondaryConnectionMaterial = new THREE.LineBasicMaterial({ 
      color: 0x00D4AA, 
      opacity: 0.2,
      transparent: true
    });

    const connections = [];
    nodes.forEach((node, i) => {
      const numConnections = node.userData.isPrimary ? 3 + Math.floor(Math.random() * 3) : 2 + Math.floor(Math.random() * 2);
      for (let j = 0; j < numConnections; j++) {
        const targetIndex = Math.floor(Math.random() * nodes.length);
        if (targetIndex !== i) {
          const points = [];
          points.push(node.position);
          points.push(nodes[targetIndex].position);
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const material = node.userData.isPrimary ? primaryConnectionMaterial.clone() : secondaryConnectionMaterial.clone();
          const line = new THREE.Line(geometry, material);
          scene.add(line);
          connections.push({
            line: line,
            start: node,
            end: nodes[targetIndex],
            pulseOffset: Math.random() * Math.PI * 2,
            isPrimary: node.userData.isPrimary
          });
        }
      }
    });

    // Add floating particles with brand colors
    const particleCount = 80;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleVelocities = [];

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 40;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 35;
      
      // Mix of brand colors for particles
      const isLime = Math.random() > 0.4;
      if (isLime) {
        particleColors[i * 3] = 0.8; // R for lime
        particleColors[i * 3 + 1] = 0.86; // G for lime
        particleColors[i * 3 + 2] = 0.22; // B for lime
      } else {
        particleColors[i * 3] = 0; // R for teal
        particleColors[i * 3 + 1] = 0.83; // G for teal
        particleColors[i * 3 + 2] = 0.67; // B for teal
      }
      
      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.08,
        y: (Math.random() - 0.5) * 0.08,
        z: (Math.random() - 0.5) * 0.08
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      opacity: 0.7,
      transparent: true,
      vertexColors: true
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Add lighting that complements brand colors
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xCDDC39, 1.2, 100);
    pointLight1.position.set(20, 20, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00D4AA, 0.8, 100);
    pointLight2.position.set(-20, -20, -20);
    scene.add(pointLight2);

    // Animation loop
    let time = 0;
    let isInView = true;
    const animate = () => {
      requestAnimationFrame(animate);
      if (!isInView) return;
      
      time += 0.008; // Slower, more elegant animation

      // Subtle scene rotation
      scene.rotation.y = time * 0.03;
      scene.rotation.x = Math.sin(time * 0.5) * 0.05;

      // Pulse nodes elegantly
      nodes.forEach(node => {
        const pulse = Math.sin(time * 1.5 + node.userData.pulseOffset) * 0.15 + 1;
        node.scale.setScalar(node.userData.baseScale * pulse);
        
        // Dynamic emissive intensity
        const intensity = node.userData.isPrimary ? 
          0.3 + Math.sin(time * 2 + node.userData.pulseOffset) * 0.1 :
          0.2 + Math.sin(time * 1.8 + node.userData.pulseOffset) * 0.05;
        node.material.emissiveIntensity = intensity;
      });

      // Pulse connections
      connections.forEach(conn => {
        const baseOpacity = conn.isPrimary ? 0.4 : 0.2;
        conn.line.material.opacity = baseOpacity + Math.sin(time * 1.2 + conn.pulseOffset) * 0.15;
      });

      // Float particles elegantly
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += particleVelocities[i].x;
        positions[i * 3 + 1] += particleVelocities[i].y;
        positions[i * 3 + 2] += particleVelocities[i].z;

        // Boundary wrapping
        if (Math.abs(positions[i * 3]) > 20) particleVelocities[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 12) particleVelocities[i].y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 17) particleVelocities[i].z *= -1;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Mouse interaction for premium feel
    let mouseX = 0;
    let mouseY = 0;
    container.addEventListener('mousemove', (event) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 3 + 10 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
    });

    // Intersection observer for performance
    const observer = new IntersectionObserver((entries) => {
      isInView = entries[0].isIntersecting;
    });
    observer.observe(container);

    // Start animation
    animate();

    // Cleanup function
    this.cleanup3DNetwork = () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      scene.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
      renderer.dispose();
    };
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new HeroAnimations();
});