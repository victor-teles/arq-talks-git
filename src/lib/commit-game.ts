import { type CommitFile, files } from './files';
import { createClient } from './supabase/client';
import { upsertGame } from './supabase/queries';

export class CommitGame {
  commits: Set<string>;
  finishedAt: Date | null | undefined;
  filePosition: number;
  userId: string;

  constructor(userId: string, filePosition: number, finishedAt: Date | null | undefined) {
    this.commits = new Set<string>();

    this.finishedAt = finishedAt;
    this.filePosition = filePosition;
    this.userId = userId;
  }

  public addCommit(message: string): number {
    const cleanedUpMessage = this.replaceRepeatedCommit(message);
    const weights = [
      this.lengthWeight(cleanedUpMessage),
      this.keywordWeight(cleanedUpMessage),
      this.conventionalCommitsWeights(cleanedUpMessage),
    ].map((weight) => weight * 100);

    this.commits.add(message);

    return weights.reduce((prev, curr) => prev + curr, 0);
  }

  public getNextFile(): CommitFile | undefined {
    this.filePosition = this.filePosition + 1;
    return this.getCurrentFile();
  }

  public getCurrentFile(): CommitFile | undefined {
    return files.at(this.filePosition);
  }

  public maybeFinishTheGame() {
    if (!this.getCurrentFile() && !this.finishedAt) {
      this.finishedAt = new Date();
    }
  }

  public async update(): Promise<void> {
    const supabase = createClient();
    await upsertGame(supabase, {
      filePosition: this.filePosition,
      userId: this.userId,
      finishedAt: this.finishedAt?.toISOString(),
    });
  }

  private lengthWeight(message: string) {
    const words = message.split(' ');

    if (words.length <= 3) return -0.1;
    if (words.length > 4 && words.length <= 6) return 0.1;

    return words.length * 0.05;
  }

  private keywordWeight(message: string) {
    const currentFile = this.getCurrentFile();
    let weights = 0;

    for (const keyword in currentFile?.keywords) {
      if (message.toLocaleLowerCase().includes(keyword.toLocaleLowerCase())) {
        weights += 0.1;
      }
    }

    return weights;
  }

  private conventionalCommitsWeights(message: string) {
    const conventionalPrefixes =
      /^(?<type>build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|¯\\_\(ツ\)_\/¯)(?<scope>\(\w+\)?((?=:\s)|(?=!:\s)))?(?<breaking>!)?(?<subject>:\s.*)?|^(?<merge>Merge \w+)/;

    if (message.match(conventionalPrefixes)) {
      return 0.1;
    }

    return 0;
  }

  private replaceRepeatedCommit(message: string): string {
    let newMessage = Array.from(new Set(message.split(' '))).join(' ');

    for (const commit of this.commits) {
      newMessage = newMessage.replace(commit, '');
    }

    return newMessage;
  }

  public isFinished() {
    return !!this.finishedAt;
  }
}
