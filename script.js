// ==========================================
// SWITCH PAGE LOGIC (for switch.html)
// ==========================================

// Check if we're on switch page
const lightSwitch = document.getElementById('lightSwitch');

if (lightSwitch) {
    // Switch page logic
    let isAnimating = false;

    lightSwitch.addEventListener('change', function() {
        if (this.checked && !isAnimating) {
            isAnimating = true;
            
            console.log('🔴 Switch ON - Redirecting to video page...');
            
            // Wait for switch animation + flicker to complete
            setTimeout(() => {
                // Redirect to video page
                window.location.href = 'video.html';
            }, 400); // 0.4s for full switch animation
        }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            lightSwitch.click();
        }
    });

    console.log('✅ Switch page loaded');
}

// ==========================================
// VIDEO PAGE LOGIC (for video.html)
// ==========================================

// Check if we're on video page
const mainVideo = document.getElementById('mainVideo');

if (mainVideo) {
    console.log('🎬 Video page loaded');

    // Ensure video plays
    mainVideo.play().then(() => {
        console.log('▶️ Video playing successfully');
    }).catch(err => {
        console.warn('⚠️ Autoplay prevented:', err);
        
        // Fallback: Play on any user interaction
        const playOnInteraction = () => {
            mainVideo.play().then(() => {
                console.log('▶️ Video playing after user interaction');
            });
            document.removeEventListener('click', playOnInteraction);
            document.removeEventListener('touchstart', playOnInteraction);
        };
        
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
    });

    // Prevent right-click context menu on video
    mainVideo.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });

    // Prevent video pause on click
    mainVideo.addEventListener('click', (e) => {
        e.preventDefault();
    });

    // Log video info when loaded
    mainVideo.addEventListener('loadedmetadata', () => {
        console.log('📹 Video duration:', mainVideo.duration.toFixed(2), 'seconds');
        console.log('📐 Video dimensions:', mainVideo.videoWidth, 'x', mainVideo.videoHeight);
    });

    // Handle video errors
    mainVideo.addEventListener('error', (e) => {
        console.error('❌ Video error:', e);
        console.error('Make sure video.mp4 exists in the same folder!');
    });

    console.log('✅ Video page initialized');
}
```

---

## **COMPLETE FOLDER STRUCTURE:**
```
D:\valentine-switch-video\
│
├── switch.html          ← Entry page (open this first)
├── video.html           ← Video page (auto-redirects here)
├── switch-style.css     ← Switch styling
├── video-style.css      ← Video page styling  
├── script.js            ← All JavaScript logic
└── video.mp4            ← Your Canva video