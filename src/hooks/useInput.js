import {useCallback, useState} from 'react';

const useInput = (initialData) => {
    const [value, setValue] = useState(initialData);
    const handler = useCallback((e) => {
        setValue(e.nativeEvent.text);
    }, []);
    return [value, handler, setValue];
};

export default useInput;
