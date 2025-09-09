// Icon Management functionality
let iconSettings = {
    desktop: {},
    taskbar: {},
    systray: {}
};

function initializeIconManagement() {
    // Load saved icon settings
    loadIconSettings();
    
    // Initialize icon toggle functionality
    const iconToggleContainers = document.querySelectorAll('.icon-toggle-container');
    
    iconToggleContainers.forEach(container => {
        const toggle = container.querySelector('.toggle-switch');
        const iconId = container.getAttribute('data-icon');
        
        if (toggle && iconId) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                const isVisible = toggle.classList.contains('active');
                updateIconVisibility(iconId, isVisible);
                
                // Save settings immediately when toggled
                saveIconSettings();
                
                console.log(`Toggle for ${iconId} changed to: ${isVisible}`);
            });
        }
    });
    
    // Apply saved settings to UI
    applyIconSettings();
}

function updateIconVisibility(iconId, isVisible) {
    // Update the settings object
    if (iconId.startsWith('desktop-')) {
        iconSettings.desktop[iconId] = isVisible;
    } else if (iconId.startsWith('taskbar-')) {
        iconSettings.taskbar[iconId] = isVisible;
    } else if (iconId.startsWith('systray-')) {
        iconSettings.systray[iconId] = isVisible;
    }
    
    // Update actual icon visibility
    const iconElement = document.querySelector(`[data-icon="${iconId}"]`);
    if (iconElement) {
        iconElement.style.display = isVisible ? 'block' : 'none';
    }
    
    // Special handling for desktop icons
    if (iconId.startsWith('desktop-')) {
        const desktopIcon = document.querySelector(`.desktop-icon[data-icon="${iconId}"]`);
        if (desktopIcon) {
            desktopIcon.style.display = isVisible ? 'block' : 'none';
        }
        // Auto-align desktop icons when visibility changes (with delay to ensure DOM updates)
        if (typeof autoAlignDesktopIcons === 'function') {
            setTimeout(() => {
                autoAlignDesktopIcons();
            }, 50);
        }
    }
    
    // Special handling for taskbar icons
    if (iconId.startsWith('taskbar-')) {
        const taskbarIcon = document.querySelector(`.taskbar-icon[data-icon="${iconId}"]`);
        if (taskbarIcon) {
            taskbarIcon.style.display = isVisible ? 'flex' : 'none';
        }
    }
    
    // Special handling for system tray icons
    if (iconId.startsWith('systray-')) {
        const systrayIcon = document.querySelector(`.system-icon[data-icon="${iconId}"]`);
        if (systrayIcon) {
            systrayIcon.style.display = isVisible ? 'block' : 'none';
        }
    }
}

function saveIconSettings() {
    localStorage.setItem('iconSettings', JSON.stringify(iconSettings));
}

function loadIconSettings() {
    const saved = localStorage.getItem('iconSettings');
    if (saved) {
        iconSettings = { ...iconSettings, ...JSON.parse(saved) };
    } else {
        // Set default visible state for all icons if no saved settings
        iconSettings = {
            desktop: {
                'desktop-this-pc': true,
                'desktop-recycle-bin': true,
                'desktop-documents': true,
                'desktop-downloads': true,
                'desktop-edge': true,
                'desktop-explorer': true,
                'desktop-store': true,
                'desktop-settings': true
            },
            taskbar: {
                'taskbar-start': true,
                'taskbar-search': true,
                'taskbar-teams': true,
                'taskbar-widgets': true,
                'taskbar-explorer': true,
                'taskbar-edge': true,
                'taskbar-store': true,
                'taskbar-office': true,
                'taskbar-settings': true,
                'taskbar-vscode': true,
                'taskbar-word': true
            },
            systray: {
                'systray-wifi': true,
                'systray-sound': true,
                'systray-bluetooth': true,
                'systray-battery': true,
                'systray-airplane': true,
                'systray-vpn': true,
                'systray-notifications': true
            }
        };
    }
}

function applyIconSettings() {
    // Apply desktop icon settings
    Object.entries(iconSettings.desktop).forEach(([iconId, isVisible]) => {
        updateIconVisibility(iconId, isVisible);
    });
    
    // Apply taskbar icon settings
    Object.entries(iconSettings.taskbar).forEach(([iconId, isVisible]) => {
        updateIconVisibility(iconId, isVisible);
    });
    
    // Apply system tray icon settings
    Object.entries(iconSettings.systray).forEach(([iconId, isVisible]) => {
        updateIconVisibility(iconId, isVisible);
    });
}

// Add custom app to taskbar
function initializeCustomAppAdder() {
    const addAppBtn = document.getElementById('addAppBtn');
    const appIconUrlInput = document.getElementById('appIconUrlInput');
    
    if (addAppBtn && appIconUrlInput) {
        addAppBtn.addEventListener('click', () => {
            const url = appIconUrlInput.value.trim();
            if (url) {
                const taskbarCenter = document.querySelector('.taskbar-center');
                if (taskbarCenter) {
                    const newIcon = document.createElement('div');
                    newIcon.className = 'taskbar-icon';
                    newIcon.setAttribute('data-icon', 'taskbar-custom-' + Date.now());
                    newIcon.innerHTML = `<img src="${url}" alt="Custom App">`;
                    taskbarCenter.appendChild(newIcon);
                    appIconUrlInput.value = '';
                    
                    // Add click handler for the new icon
                    newIcon.addEventListener('click', (e) => {
                        e.stopPropagation();
                        console.log('Custom app clicked!');
                    });
                }
            }
        });
    }
}

// Function to reset all settings to default
function resetAllSettings() {
    // Clear all localStorage
    localStorage.clear();
    
    // Reset all toggle switches to default state
    const allToggles = document.querySelectorAll('.toggle-switch');
    allToggles.forEach(toggle => {
        toggle.classList.remove('active');
        // Set specific toggles that should be active by default
        const iconId = toggle.closest('.icon-toggle-container')?.getAttribute('data-icon');
        if (iconId && (
            iconId === 'showDateToggle' || 
            iconId.includes('desktop-') || 
            iconId.includes('taskbar-') || 
            iconId.includes('systray-')
        )) {
            toggle.classList.add('active');
        }
    });
    
    // Reset wallpaper to default
    const desktopContainer = document.querySelector('.desktop-container');
    if (desktopContainer) {
        desktopContainer.style.backgroundImage = 'url("https://4kwallpapers.com/images/wallpapers/windows-11-dark-mode-blue-stock-official-3840x2400-5630.jpg")';
    }
    
    // Reset taskbar color to default
    const taskbar = document.querySelector('.taskbar');
    if (taskbar) {
        taskbar.style.background = 'rgba(32, 32, 32, 0.85)';
    }
    
    // Reset form inputs to default
    const bgUrlInput = document.getElementById('bgUrlInput');
    if (bgUrlInput) {
        bgUrlInput.value = 'https://4kwallpapers.com/images/wallpapers/windows-11-dark-mode-blue-stock-official-3840x2400-5630.jpg';
    }
    
    const taskbarColorInput = document.getElementById('taskbarColorInput');
    if (taskbarColorInput) {
        taskbarColorInput.value = '#202020';
    }
    
    const taskbarOpacityInput = document.getElementById('taskbarOpacityInput');
    if (taskbarOpacityInput) {
        taskbarOpacityInput.value = '85';
    }
    
    // Reset icon settings to default
    iconSettings = {
        desktop: {
            'desktop-this-pc': true,
            'desktop-recycle-bin': true,
            'desktop-documents': true,
            'desktop-downloads': true,
            'desktop-edge': true,
            'desktop-explorer': true,
            'desktop-store': true,
            'desktop-settings': true
        },
        taskbar: {
            'taskbar-start': true,
            'taskbar-search': true,
            'taskbar-teams': true,
            'taskbar-widgets': true,
            'taskbar-explorer': true,
            'taskbar-edge': true,
            'taskbar-store': true,
            'taskbar-office': true,
            'taskbar-settings': true,
            'taskbar-vscode': true,
            'taskbar-word': true
        },
        systray: {
            'systray-wifi': true,
            'systray-sound': true,
            'systray-bluetooth': true,
            'systray-battery': true,
            'systray-airplane': true,
            'systray-vpn': true,
            'systray-notifications': true
        }
    };
    
    // Apply the reset settings
    applyIconSettings();
    
    // Auto-align desktop icons
    if (typeof autoAlignDesktopIcons === 'function') {
        autoAlignDesktopIcons();
    }
    
    // Show success message
    alert('Settings have been reset to default!');
}

// Function to ensure proper initialization order
function initializeAll() {
    // Load icon settings first
    loadIconSettings();
    
    // Apply settings
    applyIconSettings();
    
    // Initialize icon management
    initializeIconManagement();
    
    // Initialize custom app adder
    initializeCustomAppAdder();
    
    // Auto-align desktop icons
    if (typeof autoAlignDesktopIcons === 'function') {
        autoAlignDesktopIcons();
    }
    
    // Add reset button functionality
    const resetButton = document.getElementById('resetSettings');
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all settings to default? This will clear all your customizations.')) {
                resetAllSettings();
            }
        });
    }
    
    // Add align icons button functionality
    const alignButton = document.getElementById('alignIcons');
    if (alignButton) {
        alignButton.addEventListener('click', () => {
            if (typeof autoAlignDesktopIcons === 'function') {
                autoAlignDesktopIcons();
                alert('Desktop icons have been aligned!');
            } else {
                alert('Auto-align function not available. Please refresh the page.');
            }
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeAll);

// Add global function for debugging
window.resetAllSettings = resetAllSettings;

// Add keyboard shortcut for reset (Ctrl+R)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'r' && !e.shiftKey) {
        e.preventDefault();
        if (confirm('Reset all settings to default? (Press Ctrl+Shift+R to reload page normally)')) {
            resetAllSettings();
        }
    }
});
