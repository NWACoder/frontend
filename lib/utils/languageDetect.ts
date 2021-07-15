import languages from './languages.json';

export const languageDetect = (filename: string) => {
    if (!filename) return null;
    const extIndex = filename.lastIndexOf('.');
    if (extIndex === -1 || extIndex === filename.length - 1) return null;
    const ext = filename.slice(extIndex);
    const language = Object.getOwnPropertyDescriptor(languages, ext)?.value;
    return language ? language : ext.slice(1);
};
