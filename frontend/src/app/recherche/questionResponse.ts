import { Question } from "./question";

export interface QuestionResponse {
  canEdit : boolean;
  question : Question;
}
