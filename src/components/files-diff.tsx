'use client';
import type { User } from '@supabase/supabase-js';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
  user?: User;
};

const oldCode = `
const a = 10
const b = 10
const c = () => console.log('foo')

if(a > 10) {
  console.log('bar')
}

console.log('done')
`;
const newCode = `
const a = 10
const boo = 10

if(a === 10) {
  console.log('bar')
}
`;

const newStyles = {
  variables: {
    dark: {
      gutterBackground: '#0e1116',
      diffViewerBackground: '#0e1116',
      emptyLineBackground: '#0e1116',
      highlightBackground: '#fefed5',
      highlightGutterBackground: '#ffcd3c',
    },
  },
};

function renderHighlight(codeBlock: string) {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={stackoverflowDark}
      customStyle={{
        padding: 0,
        background: 'transparent',
      }}
    >
      {codeBlock}
    </SyntaxHighlighter>
  );
}

export function FilesDiff(props: Props) {
  return (
    <div className="flex flex-col gap-2 mt-10">
      <ReactDiffViewer
        styles={newStyles}
        oldValue={oldCode}
        newValue={newCode}
        splitView={true}
        useDarkTheme
        showDiffOnly={false}
        disableWordDiff={false}
        compareMethod={DiffMethod.WORDS_WITH_SPACE}
        renderContent={renderHighlight}
      />
    </div>
  );
}
