import { useEffect } from "react";

const useTitle = (title) => {
    useEffect(() => {
        document.title = `Note Maker/${title}`
    }, [title])
}

export default useTitle;