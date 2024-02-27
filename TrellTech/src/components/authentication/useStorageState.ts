import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

/**
 * Returns a stateful value, and a function to update it, taking an initial state.
 *
 * @param {T} initialValue - The initial state value
 * @return {UseStateHook<T>} An array with the stateful value and a function to update it
 */
function useAsyncState<T>(
    initialValue: [boolean, T | null] = [true, null],
): UseStateHook<T> {
    return React.useReducer(
        (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
        initialValue
    ) as UseStateHook<T>;
}

/**
 * Sets a key-value pair in storage based on the platform.
 *
 * @param {string} key - The key to set in storage
 * @param {string | null} value - The value to set in storage
 * @return {Promise<void>} A promise that resolves when the storage operation is complete
 */
export async function setStorageItemAsync(key: string, value: string | null) {
    if (Platform.OS === 'web') {
        try {
            if (value === null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, value);
            }
        } catch (e) {
            console.error('Local storage is unavailable:', e);
        }
    } else {
        if (value == null) {
            await SecureStore.deleteItemAsync(key);
        } else {
            await SecureStore.setItemAsync(key, value);
        }
    }
}

/**
 * Returns a stateful value, and a function to update it, that persists in the storage.
 *
 * @param {string} key - The key to use for storing the state in the storage
 * @return {UseStateHook<string>} A tuple containing the stateful value and a function to update it
 */
export function useStorageState(key: string): UseStateHook<string> {
    // Public
    const [state, setState] = useAsyncState<string>();

    // Get
    React.useEffect(() => {
        if (Platform.OS === 'web') {
            try {
                if (typeof localStorage !== 'undefined') {
                    setState(localStorage.getItem(key));
                }
            } catch (e) {
                console.error('Local storage is unavailable:', e);
            }
        } else {
            SecureStore.getItemAsync(key).then(value => {
                setState(value);
            });
        }
    }, [key]);

    // Set
    const setValue = React.useCallback(
        (value: string | null) => {
            setState(value);
            setStorageItemAsync(key, value);
        },
        [key]
    );

    return [state, setValue];
}
