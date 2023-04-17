import {CodePage} from "./CodePage";

export interface Project {
  projectUuid: string;
  ownerUuid: string;
  name: string;
  isProjectPublic: boolean;
  codePageList: CodePage[];
}
