import {useState, useEffect} from 'react';

export default function useLocalStorage(key, defaultValue) {
    console.log(defaultValue);
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(key);
        if(jsonValue != null) return JSON.parse(jsonValue);

        // if(typeof defaultValue === 'function') {
        //     return defaultValue();
        // } else {
        //     return defaultValue;
        // }
    });
    console.log(value);
    console.log(defaultValue);

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}
