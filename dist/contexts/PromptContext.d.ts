/// <reference types="react" />
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
}
export interface PromptShowResultOK {
    value: string;
}
export declare type PromptShow = (showOpts: PromptShowOptions) => Promise<PromptShowResultOK>;
export declare type PromptContextValue = [PromptShow];
declare const PromptContext: import("react").Context<PromptContextValue>;
export declare const usePrompt: () => PromptContextValue;
export default PromptContext;
//# sourceMappingURL=PromptContext.d.ts.map