import { createContext, useContext } from 'react';

export interface PromptShowOptions {
  title: string;
  message: string;
  placeholder?: string;
  defaultValue?: string;
  /**
   * Not implemented yet.
   */
  type?: 'info' | 'warning' | 'error';
  buttons: Array<'OK' | 'CANCEL'>;
  buttonOKTitle?: string;
  buttonCancelTitle?: string;
}

export interface PromptShowResultOK {
  value: string;
}

export type PromptShow = (
  showOpts: PromptShowOptions
) => Promise<PromptShowResultOK>;

export type PromptContextValue = [PromptShow];

const PromptContext = createContext<PromptContextValue>(
  [] as unknown as PromptContextValue
);
export const usePrompt = (): PromptContextValue =>
  useContext<PromptContextValue>(PromptContext);

export default PromptContext;
