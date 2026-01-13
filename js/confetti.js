// Confetti effect for the surprise page

class ConfettiParticle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 6 - 3;
        this.color = this.getRandomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
        this.life = 200; // frames until particle disappears
    }

    getRandomColor() {
        const colors = [
            '#ff6b9d', '#ffb6c1', '#e91e63', '#ffd700', 
            '#ff1493', '#ff69b4', '#ffc0cb', '#ff4500'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.life--;
        
        // Apply gravity
        this.speedY += 0.05;
        
        // Add air resistance
        this.speedX *= 0.99;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.rotation * Math.PI / 180);
        
        // Draw heart shape
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(0, 0);
        this.ctx.bezierCurveTo(
            -this.size / 2, -this.size / 2,
            -this.size, this.size / 4,
            0, this.size / 2
        );
        this.ctx.bezierCurveTo(
            this.size, this.size / 4,
            this.size / 2, -this.size / 2,
            0, 0
        );
        this.ctx.fill();
        
        this.ctx.restore();
    }

    isAlive() {
        return this.life > 0 && this.y < this.canvas.height + 50;
    }
}

class ConfettiEffect {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.running = false;
        
        // Set canvas size to match window
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        if (this.canvas) {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
    }

    createParticles(count) {
        for (let i = 0; i < count; i++) {
            // Delay each particle creation for a continuous effect
            setTimeout(() => {
                this.particles.push(new ConfettiParticle(this.canvas));
            }, i * 30); // Stagger particle creation
        }
    }

    update() {
        if (!this.running) return;
        
        // Clear canvas with a semi-transparent overlay for trail effect
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            this.particles[i].draw();
            
            // Remove dead particles
            if (!this.particles[i].isAlive()) {
                this.particles.splice(i, 1);
            }
        }
        
        // Continue animation loop if there are particles or if running
        if (this.particles.length > 0 || this.running) {
            requestAnimationFrame(() => this.update());
        }
    }

    start(duration = 5000, particleCount = 150) {
        if (!this.canvas) return;
        
        this.running = true;
        this.createParticles(particleCount);
        this.update();
        
        // Stop after duration
        if (duration > 0) {
            setTimeout(() => {
                this.stop();
            }, duration);
        }
    }

    stop() {
        this.running = false;
    }

    clear() {
        this.particles = [];
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Initialize confetti when surprise page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the surprise page
    if (window.location.pathname.includes('surprise.html')) {
        // Wait a bit for the page to load, then start confetti
        setTimeout(() => {
            const confetti = new ConfettiEffect('confetti-canvas');
            if (confetti.canvas) {
                confetti.start(8000, 200); // Run for 8 seconds with 200 particles
                
                // Add periodic bursts of confetti
                setInterval(() => {
                    if (confetti.running) {
                        confetti.createParticles(20);
                    }
                }, 1000);
            }
        }, 1000);
    }
});

// Function to trigger confetti burst manually
function triggerConfetti() {
    const confetti = new ConfettiEffect('confetti-canvas');
    if (confetti.canvas) {
        confetti.start(3000, 100);
    }
}

// Make confetti function available globally
window.triggerConfetti = triggerConfetti;