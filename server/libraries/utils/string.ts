export const sanitizeHtml = function (markup) {
    markup = markup.replace(/&/g, '&amp;');
    markup = markup.replace(/</g, '&lt;');
    markup = markup.replace(/>/g, '&gt;');
    return markup;
};
