function updateButtonText(btn) {
    if (document.body.classList.contains('dark-mode')) {
        btn.innerHTML = '☀️ Light Mode';
        btn.classList.remove('mode-light');
        btn.classList.add('mode-dark');
    } else {
        btn.innerHTML = '🌙 Night Mode';
        btn.classList.remove('mode-dark');
        btn.classList.add('mode-light');
    }
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Set initial text and style
    updateButtonText(toggleBtn);

    // Toggle on click
    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        updateButtonText(toggleBtn);

        // Save preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// Run when DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeToggle);
} else {
    initThemeToggle();
}
