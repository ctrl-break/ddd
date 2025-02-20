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

    set(key: string, value: string, expires?: Date) {
        const cookieString = `${key}=${value}; path=/`;

        if (expires) {
            const expiresString = `; expires=${expires.toUTCString()}`;
            document.cookie = cookieString + expiresString;
        } else {
            document.cookie = cookieString;
        }
    }
}
