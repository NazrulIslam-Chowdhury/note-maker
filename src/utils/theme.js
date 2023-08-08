const Mode = (theme) => {
    const element = document.documentElement;

    switch (theme) {
        case 'dark':
            element.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            break;
        case 'light':
            element.classList.remove('dark')
            localStorage.setItem('theme', 'light');
            break
        default:
            break;
    }
}

export default Mode;