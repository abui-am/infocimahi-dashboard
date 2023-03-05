import { createStylesServer, ServerStyles } from '@mantine/next';
import Document, { type DocumentContext } from 'next/document';

// optional: you can provide your cache as a first argument in createStylesServer function
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const stylesServer = createStylesServer();

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    // Add your app specific logic here

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          server={stylesServer}
          key="styles"
        />,
      ],
    };
  }
}
