import {Project} from "./Project";

export interface User {
  userUuid: string;
  email: string;
  password: string;
  projectList: Project[];
}
