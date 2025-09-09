# Windows 11 Desktop Simulator

A modern, interactive Windows 11 desktop simulator built with HTML, CSS, and JavaScript. Features authentic Windows 11 icons and a fully functional desktop environment.

## Project Structure

The project has been refactored into a modular structure for better maintainability:

```
DeskFake/
├── index.html              # Main HTML file
├── css/                    # Stylesheets
│   ├── main.css           # Base styles and layout
│   ├── desktop-icons.css  # Desktop icon styles
│   ├── taskbar.css        # Taskbar and system tray styles
│   ├── start-menu.css     # Start menu styles
│   ├── notification-panel.css # Notification panel styles
│   ├── context-menu.css   # Right-click context menu styles
│   └── settings-modal.css # Settings modal styles
├── js/                     # JavaScript modules
│   ├── clock.js           # Clock functionality and settings
│   ├── ui-interactions.js # UI interactions (start menu, notifications, etc.)
│   ├── settings.js        # Settings functionality
│   ├── desktop-icons.js   # Desktop icons and taskbar functionality
│   ├── icon-management.js # Icon visibility and management
│   └── wallpaper-taskbar.js # Wallpaper and taskbar customization
├── assets/                 # Static assets (images, etc.)
└── README.md              # This file
```

## Features

- **Interactive Desktop**: Click and interact with desktop icons
- **Functional Taskbar**: Working start menu, system tray, and clock
- **Authentic Windows 11 Icons**: Uses real Windows 11 system icons from [WindowsIcons repository](https://github.com/HaydenReeve/WindowsIcons)
- **Settings Panel**: Customize time format, date format, and icon visibility
- **Wallpaper Customization**: Change desktop wallpaper and taskbar colors
- **Icon Management**: Toggle desktop, taskbar, and system tray icons
- **Auto-Alignment**: Desktop icons automatically align when toggled
- **Responsive Design**: Adapts to different screen sizes
- **Modern UI**: Windows 11-inspired design with blur effects and animations
- **Keyboard Shortcuts**: Ctrl+Shift+A for icon alignment, Ctrl+R for reset

## Getting Started

1. Open `index.html` in a modern web browser
2. The desktop will load with all functionality available
3. Click the Start button to open the start menu
4. Click the clock to open the notification panel
5. Click the Settings icon to customize the desktop

## Customization

### Time & Date Settings
- Change timezone
- Switch between 12/24 hour format
- Customize date format
- Toggle seconds display
- Set custom time
- Display date in taskbar

### Desktop Icons
- Show/hide desktop icons (This PC, Recycle Bin, Documents, Downloads, etc.)
- Auto-alignment system
- Right-click context menu
- Manual alignment with button or Ctrl+Shift+A

### Taskbar Icons
- Toggle taskbar icons (Search, Teams, Widgets, File Explorer, Edge, Store, Office, Settings, VS Code, Word)
- Pin/unpin applications

### System Tray
- Toggle system tray icons
- Wi-Fi, Bluetooth, Battery, Airplane Mode, VPN, Notifications

### Wallpaper & Appearance
- Change desktop wallpaper
- Customize taskbar color and opacity
- Reset to default settings

## Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with ES6 support

## Development

The codebase is organized into modular files for easy maintenance:

- **CSS**: Separated by component for better organization
- **JavaScript**: Modular approach with separate files for different functionalities
- **HTML**: Clean structure with proper imports

## Icons

This project uses authentic Windows 11 icons sourced from the [WindowsIcons repository by HaydenReeve](https://github.com/HaydenReeve/WindowsIcons). These icons are extracted directly from Windows system files (imageres.dll, shell32.dll, etc.) providing an authentic Windows 11 experience.

### Icon Sources:
- **Desktop Icons**: This PC, Recycle Bin, Documents, Downloads, Microsoft Edge, File Explorer, Microsoft Store, Settings
- **Taskbar Icons**: Search, Microsoft Teams, Widgets, File Explorer, Microsoft Edge, Microsoft Store, Microsoft Office, Settings, Visual Studio Code, Microsoft Word
- **System Tray Icons**: Wi-Fi, Sound, Bluetooth, Battery, Airplane Mode, VPN, Notifications

## Technical Details

- **Local Storage**: Settings persistence across browser sessions
- **Modular Architecture**: Clean separation of concerns with dedicated CSS and JS files
- **No Build Process**: Runs directly in browser - just open `index.html`
- **Responsive Design**: Works on desktop and mobile devices
- **Modern JavaScript**: ES6+ features with proper event handling

## Contributing

Feel free to contribute to this project by:
- Adding new features
- Improving the UI/UX
- Fixing bugs
- Adding more customization options

## License

This project is open source and available under the MIT License.
