// Start Menu
const startButton = document.getElementById('startButton');
const startMenu = document.getElementById('startMenu');

if (startButton && startMenu) {
    startButton.addEventListener('click', (e) => {
        e.stopPropagation();
        startMenu.classList.toggle('active');
        const notificationPanel = document.getElementById('notificationPanel');
        const contextMenu = document.getElementById('contextMenu');
        if (notificationPanel) notificationPanel.classList.remove('active');
        if (contextMenu) contextMenu.classList.remove('active');
    });
}

// Notification Panel
const clockWidget = document.getElementById('clockWidget');
const notificationPanel = document.getElementById('notificationPanel');

if (clockWidget && notificationPanel) {
    clockWidget.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationPanel.classList.toggle('active');
        if (startMenu) startMenu.classList.remove('active');
        if (contextMenu) contextMenu.classList.remove('active');
    });
}

// Context Menu
const contextMenu = document.getElementById('contextMenu');

// Desktop right-click
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (contextMenu) {
        contextMenu.style.left = e.pageX + 'px';
        contextMenu.style.top = e.pageY + 'px';
        contextMenu.classList.add('active');
        if (startMenu) startMenu.classList.remove('active');
        if (notificationPanel) notificationPanel.classList.remove('active');
    }
});

// Close menus when clicking elsewhere
document.addEventListener('click', (e) => {
    if (startMenu && !startMenu.contains(e.target) && !startButton.contains(e.target)) {
        startMenu.classList.remove('active');
    }
    if (notificationPanel && !notificationPanel.contains(e.target) && !clockWidget.contains(e.target)) {
        notificationPanel.classList.remove('active');
    }
    if (contextMenu && !contextMenu.contains(e.target)) {
        contextMenu.classList.remove('active');
    }
});

// Settings Modal
const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
const closeButton = document.getElementById('closeButton');

if (settingsButton && settingsModal) {
    settingsButton.addEventListener('click', () => {
        settingsModal.classList.add('active');
    });
}

if (closeButton && settingsModal) {
    closeButton.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });
}

if (settingsModal) {
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) {
            settingsModal.classList.remove('active');
        }
    });
}
