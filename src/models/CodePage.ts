export interface CodePage {
  codePageUuid: string;
  projectUuid: string;
  name: string;
  language: string; //todo: Refactor en enum ?
  isLocked : boolean;
  codeCommentary: string;
  codeTextContent: string;
}
