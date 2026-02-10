// ==========================================
// SWITCH PAGE LOGIC (for index.html)
// ==========================================

// Check if we're on switch page
const lightSwitch = document.getElementById('lightSwitch');

if (lightSwitch) {
    // ✅ FIX: Force reset switch to OFF on page load
    window.addEventListener('load', () => {
        lightSwitch.checked = false;
        console.log('🔄 Switch reset to OFF');
    });

    // ✅ FIX: Also reset on pageshow (handles back button)
    window.addEventListener('pageshow', (event) => {
        // If page is loaded from cache (back button)
        if (event.persisted || (performance.navigation && performance.navigation.type === 2)) {
            lightSwitch.checked = false;
            console.log('🔄 Switch reset after back button');
        }
    });

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

## **FINAL FILE STRUCTURE:**
```
D:\valentine-switch-video\
│
├── index.html           ✅ COMPLETE
├── video.html           ✅ COMPLETE
├── switch-style.css     ✅ COMPLETE
├── video-style.css      ✅ COMPLETE (Smart Fit)
├── script.js            ✅ COMPLETE (With back button fix)
└── video.mp4            ← Your Canva video