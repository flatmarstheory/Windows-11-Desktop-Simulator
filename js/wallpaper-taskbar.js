// Wallpaper and Taskbar functionality
function initializeWallpaperAndTaskbar() {
    // Wallpaper functionality
    const bgUrlInput = document.getElementById('bgUrlInput');
    const wallpaperItems = document.querySelectorAll('.wallpaper-item');
    const desktopContainer = document.querySelector('.desktop-container');
    
    // Background URL input
    if (bgUrlInput) {
        bgUrlInput.addEventListener('change', (e) => {
            const url = e.target.value.trim();
            if (url) {
                desktopContainer.style.backgroundImage = `url('${url}')`;
                saveWallpaperSettings(url);
            }
        });
    }
    
    // Wallpaper selection grid
    wallpaperItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove selection from other items
            wallpaperItems.forEach(otherItem => {
                otherItem.classList.remove('selected');
            });
            
            // Add selection to clicked item
            item.classList.add('selected');
            
            // Apply wallpaper
            const url = item.getAttribute('data-url');
            if (url && desktopContainer) {
                desktopContainer.style.backgroundImage = `url('${url}')`;
                if (bgUrlInput) bgUrlInput.value = url;
                saveWallpaperSettings(url);
            }
        });
    });
    
    // Taskbar color functionality
    const taskbarColorInput = document.getElementById('taskbarColorInput');
    const taskbarOpacityInput = document.getElementById('taskbarOpacityInput');
    const colorPreview = document.getElementById('colorPreview');
    const taskbar = document.querySelector('.taskbar');
    
    if (taskbarColorInput && taskbarOpacityInput && colorPreview && taskbar) {
        taskbarColorInput.addEventListener('input', (e) => {
            const color = e.target.value;
            const opacity = taskbarOpacityInput.value / 100;
            updateTaskbarColor(color, opacity);
            updateColorPreview(color, opacity);
            saveTaskbarSettings(color, opacity);
        });
        
        taskbarOpacityInput.addEventListener('input', (e) => {
            const opacity = e.target.value / 100;
            const color = taskbarColorInput.value;
            updateTaskbarColor(color, opacity);
            updateColorPreview(color, opacity);
            saveTaskbarSettings(color, opacity);
        });
    }
    
    // Load saved settings
    loadWallpaperSettings();
    loadTaskbarSettings();
}

function updateTaskbarColor(color, opacity) {
    const taskbar = document.querySelector('.taskbar');
    if (taskbar) {
        // Convert hex to RGB
        const rgb = hexToRgb(color);
        taskbar.style.background = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
    }
}

function updateColorPreview(color, opacity) {
    const colorPreview = document.getElementById('colorPreview');
    if (colorPreview) {
        const rgb = hexToRgb(color);
        colorPreview.style.background = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
    }
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 32, g: 32, b: 32 };
}

function saveWallpaperSettings(url) {
    localStorage.setItem('wallpaperUrl', url);
}

function loadWallpaperSettings() {
    const saved = localStorage.getItem('wallpaperUrl');
    if (saved) {
        const desktopContainer = document.querySelector('.desktop-container');
        const bgUrlInput = document.getElementById('bgUrlInput');
        if (desktopContainer) {
            desktopContainer.style.backgroundImage = `url('${saved}')`;
        }
        if (bgUrlInput) {
            bgUrlInput.value = saved;
        }
    }
}

function saveTaskbarSettings(color, opacity) {
    localStorage.setItem('taskbarColor', color);
    localStorage.setItem('taskbarOpacity', opacity);
}

function loadTaskbarSettings() {
    const savedColor = localStorage.getItem('taskbarColor');
    const savedOpacity = localStorage.getItem('taskbarOpacity');
    
    if (savedColor && savedOpacity) {
        const taskbarColorInput = document.getElementById('taskbarColorInput');
        const taskbarOpacityInput = document.getElementById('taskbarOpacityInput');
        
        if (taskbarColorInput) taskbarColorInput.value = savedColor;
        if (taskbarOpacityInput) taskbarOpacityInput.value = savedOpacity * 100;
        
        updateTaskbarColor(savedColor, savedOpacity);
        updateColorPreview(savedColor, savedOpacity);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeWallpaperAndTaskbar);
