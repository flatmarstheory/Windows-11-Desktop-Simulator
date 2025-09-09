// Desktop Icons functionality
function initializeDesktopIcons() {
    // Desktop icon interactions
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    
    desktopIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remove selection from other icons
            desktopIcons.forEach(otherIcon => {
                if (otherIcon !== icon) {
                    otherIcon.classList.remove('selected');
                }
            });
            
            // Toggle selection on clicked icon
            icon.classList.toggle('selected');
            
            // Auto-align icons after selection/deselection
            autoAlignDesktopIcons();
        });
        
        // Double-click to open (placeholder functionality)
        icon.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            const iconName = icon.getAttribute('data-name');
            console.log(`Opening ${iconName}...`);
            // Here you would add actual functionality for each icon
        });
    });
    
    // Auto-align desktop icons on page load
    autoAlignDesktopIcons();
}

function autoAlignDesktopIcons() {
    const desktopIcons = document.querySelectorAll('.desktop-icon');
    const positions = [
        { top: 20, left: 20 },
        { top: 120, left: 20 },
        { top: 220, left: 20 },
        { top: 320, left: 20 },
        { top: 420, left: 20 },
        { top: 520, left: 20 },
        { top: 620, left: 20 },
        { top: 720, left: 20 },
        { top: 20, left: 110 },
        { top: 120, left: 110 },
        { top: 220, left: 110 },
        { top: 320, left: 110 },
        { top: 420, left: 110 },
        { top: 520, left: 110 },
        { top: 620, left: 110 },
        { top: 720, left: 110 },
        { top: 20, left: 200 },
        { top: 120, left: 200 },
        { top: 220, left: 200 },
        { top: 320, left: 200 },
        { top: 420, left: 200 },
        { top: 520, left: 200 },
        { top: 620, left: 200 },
        { top: 720, left: 200 }
    ];
    
    // Filter only visible icons
    const visibleIcons = Array.from(desktopIcons).filter(icon => {
        const style = window.getComputedStyle(icon);
        return style.display !== 'none' && style.visibility !== 'hidden';
    });
    
    console.log(`Auto-aligning ${visibleIcons.length} visible desktop icons`);
    
    visibleIcons.forEach((icon, index) => {
        if (index < positions.length) {
            const pos = positions[index];
            icon.style.top = pos.top + 'px';
            icon.style.left = pos.left + 'px';
            icon.setAttribute('data-position', index);
            console.log(`Aligned ${icon.getAttribute('data-name')} to position ${index}: ${pos.top}px, ${pos.left}px`);
        }
    });
}

// Taskbar functionality
function initializeTaskbar() {
    const taskbarIcons = document.querySelectorAll('.taskbar-icon');
    
    taskbarIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remove active state from other icons
            taskbarIcons.forEach(otherIcon => {
                if (otherIcon !== icon) {
                    otherIcon.classList.remove('active');
                }
            });
            
            // Toggle active state on clicked icon
            icon.classList.toggle('active');
            
            const iconName = icon.querySelector('img')?.alt || 'Unknown';
            console.log(`Taskbar icon clicked: ${iconName}`);
        });
    });
}

// Make autoAlignDesktopIcons globally available
window.autoAlignDesktopIcons = autoAlignDesktopIcons;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Delay initialization to ensure other modules are loaded first
    setTimeout(() => {
        initializeDesktopIcons();
        initializeTaskbar();
    }, 100);
});

// Add keyboard shortcut for manual alignment (Ctrl+Shift+A)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        autoAlignDesktopIcons();
        console.log('Desktop icons aligned via keyboard shortcut');
    }
});
