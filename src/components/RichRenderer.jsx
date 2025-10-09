'use client'; // This is needed if you use advanced interactive features

import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

const RichTextRenderer = ({ data }) => {
  const html = convertLexicalToHTML({ data })

  return <div dangerouslySetInnerHTML={{ __html: html }} />
};

export default RichTextRenderer;
