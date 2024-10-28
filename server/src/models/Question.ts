import { Schema, model, type Document } from 'mongoose';

interface IAnswer extends Document {
  text: string;
  isCorrect: boolean;
}

interface IQuestion extends Document {
  question: string;
  answers: IAnswer[];
}

// Define the QuestionSchema
const QuestionSchema = new Schema<IQuestion>({
  question: { type: String, required: true },
  answers: [
    {
      text: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
    },
  ],
});

// Create the model using the schema
const Question = model<IQuestion>('Question', QuestionSchema);

// Export types and model
export type { IAnswer, IQuestion };
export { Question };
