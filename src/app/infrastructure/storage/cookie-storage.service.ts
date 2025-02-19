export class CookieStorage {
    get(key: string): string | null {
        const name = key + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let c of ca) {
            c = c.trim();
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    set(key: string, value: string) {
        document.cookie = `${key}=${value}; path=/`;
    }
}
