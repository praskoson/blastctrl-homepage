let darkTheme = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#dark-mode-toggle');

const enableDarkMode = () => {
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = () => {
    document.body.classList.remove('dark');
    localStorage.removeItem('darkMode')
};

if (darkTheme === 'enabled') {
    enableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
    darkTheme = localStorage.getItem('darkMode');
    if (darkTheme !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});
