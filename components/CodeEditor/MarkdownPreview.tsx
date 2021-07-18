// @ts-ignore
import DOMPurify from 'dompurify';
import Markdown from 'markdown-to-jsx';

import React from 'react';

export const MarkdownPreview = ({ content }: { content: string }) => {
    const cleanHTML = DOMPurify.sanitize(content);
    return (
        <div className="h-full markdown text-left px-2 overflow-y-auto">
            <Markdown children={cleanHTML} />
        </div>
    );
};
