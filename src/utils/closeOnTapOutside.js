const closeOnTapOutside = (ref, setState) => {
    let closeOnTap = (e) => {
        if (!ref.current.contains(e.target)) {
            setState(false);
        }
    };
    document.addEventListener('mousedown', closeOnTap);

    return () => {
        document.removeEventListener('mousedown', closeOnTap)
    }
}

export default closeOnTapOutside;