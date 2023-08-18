const sortData = (notes, setNotes, isAsc, setIsAsc) => {
    let data = [...notes];
    if (data.length > 0 && isAsc) {
        setIsAsc(false);
        const ascNotes = data.sort((a, b) => a.title.localeCompare(b.title));
        setNotes(ascNotes)
    } if (data.length > 0 && !isAsc) {
        setIsAsc(true);
        const ascNotes = data.sort((a, b) => b.title.localeCompare(a.title));
        setNotes(ascNotes);
    }
}

export default sortData;