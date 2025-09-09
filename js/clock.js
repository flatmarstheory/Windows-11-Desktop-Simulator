// Clock functionality with settings
let clockSettings = {
    timezone: 'auto',
    timeFormat: '12',
    dateFormat: 'MM/DD/YYYY',
    showSeconds: false,
    showDate: true,
    useCustomTime: false,
    customTime: null
};

let customTimeOffset = 0; // Offset in milliseconds from system time

function updateClock() {
    let now = new Date();
    
    // Apply custom time offset if enabled
    if (clockSettings.useCustomTime && clockSettings.customTime) {
        now = new Date(clockSettings.customTime.getTime() + customTimeOffset);
        console.log('Using custom time:', now, 'Offset:', customTimeOffset);
    }
    let timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: clockSettings.timeFormat === '12'
    };
    
    if (clockSettings.showSeconds) {
        timeOptions.second = '2-digit';
    }
    
    if (clockSettings.timezone !== 'auto') {
        timeOptions.timeZone = clockSettings.timezone;
    }
    
    const time = now.toLocaleTimeString([], timeOptions);
    
    // Format date based on settings
    let dateOptions = {
        timeZone: clockSettings.timezone !== 'auto' ? clockSettings.timezone : undefined
    };
    
    let date;
    switch (clockSettings.dateFormat) {
        case 'MM/DD/YYYY':
            date = now.toLocaleDateString('en-US', dateOptions);
            break;
        case 'DD/MM/YYYY':
            date = now.toLocaleDateString('en-GB', dateOptions);
            break;
        case 'YYYY-MM-DD':
            date = now.toLocaleDateString('sv-SE', dateOptions);
            break;
        case 'DD MMM YYYY':
            date = now.toLocaleDateString('en-GB', { ...dateOptions, day: '2-digit', month: 'short', year: 'numeric' });
            break;
        case 'MMM DD, YYYY':
            date = now.toLocaleDateString('en-US', { ...dateOptions, day: '2-digit', month: 'short', year: 'numeric' });
            break;
        default:
            date = now.toLocaleDateString([], dateOptions);
    }
    
    document.getElementById('time').textContent = time;
    if (clockSettings.showDate) {
        document.getElementById('date').textContent = date;
        document.getElementById('date').style.display = 'block';
    } else {
        document.getElementById('date').style.display = 'none';
    }
}

// Save and load clock settings
function saveClockSettings() {
    // Convert customTime to ISO string for storage
    const settingsToSave = { ...clockSettings };
    if (settingsToSave.customTime) {
        settingsToSave.customTime = settingsToSave.customTime.toISOString();
    }
    localStorage.setItem('clockSettings', JSON.stringify(settingsToSave));
}

function loadClockSettings() {
    const saved = localStorage.getItem('clockSettings');
    if (saved) {
        const loadedSettings = JSON.parse(saved);
        clockSettings = { ...clockSettings, ...loadedSettings };
        
        // Convert ISO string back to Date object
        if (loadedSettings.customTime) {
            clockSettings.customTime = new Date(loadedSettings.customTime);
        }
    }
    
    // Always update UI elements to match current clockSettings
    const timezoneSelect = document.getElementById('timezoneSelect');
    const timeFormatSelect = document.getElementById('timeFormatSelect');
    const dateFormatSelect = document.getElementById('dateFormatSelect');
    const showSecondsToggle = document.getElementById('showSecondsToggle');
    const showDateToggle = document.getElementById('showDateToggle');
    const useCustomTimeToggle = document.getElementById('useCustomTimeToggle');
    const customTimeInput = document.getElementById('customTimeInput');
    const customTimeGroup = document.getElementById('customTimeGroup');
    
    if (timezoneSelect) timezoneSelect.value = clockSettings.timezone;
    if (timeFormatSelect) timeFormatSelect.value = clockSettings.timeFormat;
    if (dateFormatSelect) dateFormatSelect.value = clockSettings.dateFormat;
    
    // Reset all toggles first
    if (showSecondsToggle) showSecondsToggle.classList.remove('active');
    if (showDateToggle) showDateToggle.classList.remove('active');
    if (useCustomTimeToggle) useCustomTimeToggle.classList.remove('active');
    if (customTimeGroup) customTimeGroup.style.display = 'none';
    
    // Then set active states based on settings
    if (clockSettings.showSeconds && showSecondsToggle) {
        showSecondsToggle.classList.add('active');
    }
    if (clockSettings.showDate && showDateToggle) {
        showDateToggle.classList.add('active');
    }
    if (clockSettings.useCustomTime && useCustomTimeToggle) {
        useCustomTimeToggle.classList.add('active');
        if (customTimeGroup) customTimeGroup.style.display = 'block';
        if (clockSettings.customTime && customTimeInput) {
            customTimeInput.value = clockSettings.customTime.toISOString().slice(0, 16);
        }
    }
    
    updateClock();
}

// Initialize clock
setInterval(() => {
    // Increment custom time offset if using custom time
    if (clockSettings.useCustomTime && clockSettings.customTime) {
        customTimeOffset += 1000; // Add 1 second
    }
    updateClock();
}, 1000);
updateClock();
