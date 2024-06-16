'use client';

import type { User } from '@supabase/supabase-js';
import ReactDiffViewer from 'react-diff-viewer';

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
      gutterBackground: '#000',
      diffViewerBackground: '#000',
      highlightBackground: '#fefed5',
      highlightGutterBackground: '#ffcd3c',
    },
  },
};

export function FilesDiff(props: Props) {
  return (
    <div className="flex flex-col gap-2 mt-10">
      <ReactDiffViewer
        styles={newStyles}
        oldValue={oldCode}
        newValue={newCode}
        splitView={false}
        useDarkTheme
        showDiffOnly={false}
      />
    </div>
  );
}
