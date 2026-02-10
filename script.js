// ==========================================
// SWITCH PAGE LOGIC (for index.html)
// ==========================================

const lightSwitch = document.getElementById('lightSwitch');

if (lightSwitch) {
    
    // ✅ CRITICAL: Reset function for switch
    function resetSwitch() {
        lightSwitch.checked = false;
        
        // Force CSS reset by removing and re-adding animations
        const button = lightSwitch.nextElementSibling;
        if (button) {
            button.style.animation = 'none';
            button.offsetHeight; // Trigger reflow
            button.style.animation = null;
        }
        
        console.log('🔄 Switch fully reset');
    }
    
    // Reset on window load
    window.addEventListener('load', () => {
        resetSwitch();
        console.log('🔄 Switch reset on load');
    });
    
    // ✅ CRITICAL: Reset on pageshow (handles back button)
    window.addEventListener('pageshow', function(event) {
        resetSwitch();
        
        // Check if page was loaded from cache (back button)
        if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
            console.log('🔄 Pageshow - Back button detected, switch reset');
        } else {
            console.log('🔄 Pageshow - Normal load, switch reset');
        }
    });
    
    // Reset on DOMContentLoaded (extra safety)
    document.addEventListener('DOMContentLoaded', () => {
        resetSwitch();
        console.log('🔄 DOMContentLoaded - switch reset');
    });
    
    // Switch click logic
    let isAnimating = false;

    lightSwitch.addEventListener('change', function() {
        if (this.checked && !isAnimating) {
            isAnimating = true;
            
            console.log('🔴 Switch ON - Starting animation');
            
            // Wait for switch animation + flicker
            setTimeout(() => {
                console.log('🔴 Redirecting to video.html...');
                window.location.href = 'video.html';
            }, 400); // 0.4s for animation
        } else if (!this.checked) {
            console.log('⚫ Switch turned OFF');
            isAnimating = false;
        }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !isAnimating) {
            e.preventDefault();
            lightSwitch.click();
        }
    });

    console.log('✅ Switch page loaded and ready');
}

// ==========================================
// VIDEO PAGE LOGIC (for video.html)
// ==========================================

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
            }).catch(e => {
                console.error('❌ Still cannot play video:', e);
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
        console.error('❌ Make sure video.mp4 exists in the same folder!');
        
        // Show error message to user
        document.body.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 50, 50, 0.9);
                color: white;
                padding: 30px;
                border-radius: 10px;
                text-align: center;
                font-family: Arial, sans-serif;
            ">
                <h2>⚠️ Video Not Found</h2>
                <p>Please make sure <strong>video.mp4</strong> exists in the folder.</p>
                <button onclick="window.history.back()" style="
                    margin-top: 20px;
                    padding: 10px 20px;
                    background: white;
                    color: #333;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                ">Go Back</button>
            </div>
        `;
    });

    console.log('✅ Video page initialized');
}