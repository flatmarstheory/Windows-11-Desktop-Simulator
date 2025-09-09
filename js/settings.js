// Settings functionality
function initializeSettings() {
    // Time settings controls
    const timezoneSelect = document.getElementById('timezoneSelect');
    const timeFormatSelect = document.getElementById('timeFormatSelect');
    const dateFormatSelect = document.getElementById('dateFormatSelect');
    const showSecondsToggle = document.getElementById('showSecondsToggle');
    const showDateToggle = document.getElementById('showDateToggle');
    const useCustomTimeToggle = document.getElementById('useCustomTimeToggle');
    const customTimeInput = document.getElementById('customTimeInput');
    const customTimeGroup = document.getElementById('customTimeGroup');
    
    // Check if all required elements exist
    if (!timezoneSelect || !timeFormatSelect || !dateFormatSelect || !showSecondsToggle || !showDateToggle || !useCustomTimeToggle || !customTimeInput || !customTimeGroup) {
        console.error('One or more required elements not found:', {
            timezoneSelect: !!timezoneSelect,
            timeFormatSelect: !!timeFormatSelect,
            dateFormatSelect: !!dateFormatSelect,
            showSecondsToggle: !!showSecondsToggle,
            showDateToggle: !!showDateToggle,
            useCustomTimeToggle: !!useCustomTimeToggle,
            customTimeInput: !!customTimeInput,
            customTimeGroup: !!customTimeGroup
        });
    }
    
    // Debug: Check if elements are found
    console.log('Show seconds toggle element:', showSecondsToggle);
    console.log('Show date toggle element:', showDateToggle);
    console.log('Custom time toggle element:', useCustomTimeToggle);
    console.log('Custom time input element:', customTimeInput);
    console.log('Custom time group element:', customTimeGroup);
    
    if (timezoneSelect) {
        timezoneSelect.addEventListener('change', (e) => {
            clockSettings.timezone = e.target.value;
            updateClock();
            saveClockSettings(); // Save immediately
            console.log('Timezone changed to:', clockSettings.timezone);
        });
    }

    if (timeFormatSelect) {
        timeFormatSelect.addEventListener('change', (e) => {
            clockSettings.timeFormat = e.target.value;
            updateClock();
            saveClockSettings(); // Save immediately
            console.log('Time format changed to:', clockSettings.timeFormat);
        });
    }
    
    if (dateFormatSelect) {
        dateFormatSelect.addEventListener('change', (e) => {
            clockSettings.dateFormat = e.target.value;
            updateClock();
            saveClockSettings(); // Save immediately
            console.log('Date format changed to:', clockSettings.dateFormat);
        });
    }
    
    if (showSecondsToggle) {
        // Test if element is clickable
        showSecondsToggle.style.pointerEvents = 'auto';
        showSecondsToggle.style.zIndex = '10';
        
        showSecondsToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Show seconds toggle clicked!', e);
            showSecondsToggle.classList.toggle('active');
            clockSettings.showSeconds = showSecondsToggle.classList.contains('active');
            updateClock();
            saveClockSettings(); // Save immediately
            console.log('Show seconds toggled:', clockSettings.showSeconds);
        });
        
        // Also try mousedown as backup
        showSecondsToggle.addEventListener('mousedown', (e) => {
            console.log('Show seconds toggle mousedown!', e);
        });
    } else {
        console.error('Show seconds toggle element not found!');
    }
    
    if (showDateToggle) {
        showDateToggle.addEventListener('click', () => {
            showDateToggle.classList.toggle('active');
            clockSettings.showDate = showDateToggle.classList.contains('active');
            updateClock();
            saveClockSettings(); // Save immediately
            console.log('Show date toggled:', clockSettings.showDate);
        });
    }
    
    if (useCustomTimeToggle) {
        useCustomTimeToggle.addEventListener('click', () => {
            console.log('Custom time toggle clicked!');
            useCustomTimeToggle.classList.toggle('active');
            clockSettings.useCustomTime = useCustomTimeToggle.classList.contains('active');
            console.log('Custom time enabled:', clockSettings.useCustomTime);
            
            if (clockSettings.useCustomTime) {
                if (customTimeGroup) customTimeGroup.style.display = 'block';
                // Set default custom time to current time if not set
                if (!clockSettings.customTime) {
                    const now = new Date();
                    if (customTimeInput) customTimeInput.value = now.toISOString().slice(0, 16);
                    clockSettings.customTime = now;
                    console.log('Set default custom time:', now);
                }
            } else {
                if (customTimeGroup) customTimeGroup.style.display = 'none';
                customTimeOffset = 0; // Reset offset when disabling custom time
                console.log('Custom time disabled, reset offset');
            }
            updateClock();
            saveClockSettings(); // Save immediately
        });
    } else {
        console.error('Custom time toggle element not found!');
    }
    
    if (customTimeInput) {
        customTimeInput.addEventListener('change', (e) => {
            if (e.target.value) {
                clockSettings.customTime = new Date(e.target.value);
                customTimeOffset = 0; // Reset offset when setting new custom time
                console.log('Custom time changed to:', clockSettings.customTime);
                updateClock();
                saveClockSettings(); // Save immediately
            }
        });
    } else {
        console.error('Custom time input element not found!');
    }
}

// Initialize settings when DOM is ready
document.addEventListener('DOMContentLoaded', initializeSettings);
