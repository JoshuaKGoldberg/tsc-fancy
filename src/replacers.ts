/**
 * Replaces text in a string.
 *
 * @param text   Original text.
 * @param replacers   Regular expressions with text to replace them with.
 * @returns Text replaced by the replacers.
 */
export const applyReplacements = (text: string, replacers: Map<RegExp, string> | undefined): string => {
    if (replacers === undefined) {
        return text;
    }

    replacers.forEach((search, replacement) => {
        text = text.replace(replacement, search);
    });

    return text;
};
