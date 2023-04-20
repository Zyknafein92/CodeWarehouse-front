import {CodePage} from "./CodePage";

export interface Project {
  projectUuid: string;
  ownerUuid: string;
  name: string;
  description: string;
  isProjectPublic: boolean;
  codePageList: CodePage[];
}
