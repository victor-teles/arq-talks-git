'use client';
import { useGame } from '@/lib/game-provider';
import type { User } from '@supabase/supabase-js';
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { stackoverflowDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type Props = {
  user?: User;
};

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
  const { game } = useGame();

  return (
    <div className="flex flex-col gap-2 mt-10">
      <ReactDiffViewer
        styles={newStyles}
        oldValue={game?.getCurrentFile()?.original}
        newValue={game?.getCurrentFile()?.changed}
        splitView={false}
        useDarkTheme
        showDiffOnly={false}
        disableWordDiff={false}
        compareMethod={DiffMethod.WORDS_WITH_SPACE}
        renderContent={renderHighlight}
      />
    </div>
  );
}
