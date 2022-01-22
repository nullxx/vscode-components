/** @jsx jsx */
import { jsx } from '@emotion/react'; // to avoid unused var
import React from 'react';
import PromptContext, {
  PromptContextValue,
  PromptShowOptions,
  PromptShowResultOK,
} from '../contexts/PromptContext';
import * as style from '../styles/prompt.style';

// TODO: IN PROGRESS https://sh.nullx.me/rilez
const Prompt: React.FC = (props) => {
  const promptInputRef = React.createRef<HTMLInputElement>();
  const promptOKRef = React.createRef<HTMLButtonElement>();
  const promptCancelRef = React.createRef<HTMLButtonElement>();

  const [showOverlay, setShowOverlay] = React.useState(false);
  const [showContainerAbs, setShowContainerAbs] = React.useState(false);

  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [defaultV, setDefaultV] = React.useState('');
  const [placeholder, setPlaceholder] = React.useState('');
  const [okTitle, setOkTitle] = React.useState('');
  const [cancelTitle, setCancelTitle] = React.useState('');

  const promptShow = async ({
    title,
    message,
    buttons,
    placeholder = 'Write here...',
    defaultValue = '',
    buttonOKTitle = 'OK',
    buttonCancelTitle = 'Cancel',
  }: PromptShowOptions) => {
    return new Promise<PromptShowResultOK>((resolve, reject) => {
      if (
        !promptCancelRef.current ||
        !promptOKRef.current ||
        !promptInputRef.current
      )
        return reject(new Error('Prompt is not ready'));

      const dispose = (success = true) => {
        setShowOverlay(false);
        setShowContainerAbs(false);

        if (!promptInputRef.current)
          return reject(new Error('Prompt input is not defined'));
        if (success) return resolve({ value: promptInputRef.current.value });

        return reject(new Error('Canceled'));
      };

      promptCancelRef.current.onclick = () => dispose(false);
      promptOKRef.current.onclick = () => dispose(true);
      promptInputRef.current.onkeyup = (e) => {
        if (e.key === 'Enter') {
          dispose();
        } else if (e.key === 'Escape') {
          dispose(false);
        }
      };

      if (buttons.includes('CANCEL')) {
        promptCancelRef.current.style.display = 'block';
      }

      if (buttons.includes('OK')) {
        promptOKRef.current.style.display = 'block';
      }

      setTitle(title);
      setDesc(message);
      setDefaultV(defaultValue);
      setPlaceholder(placeholder);
      setOkTitle(buttonOKTitle);
      setCancelTitle(buttonCancelTitle);

      setShowContainerAbs(true);
      setShowOverlay(true);
    });
  };

  const promptValue: PromptContextValue = [promptShow];

  return (
    <PromptContext.Provider value={promptValue}>
      <div
        style={{ display: showOverlay ? 'block' : 'none' }}
        css={style.promptOverlayStyle}
      />
      <div
        style={{ display: showContainerAbs ? 'block' : 'none' }}
        css={style.promptContainerAbsStyle}
      >
        <div css={style.promptContainerStyle}>
          <div css={style.promptTextContainerStyle}>
            <h3 css={style.promptTitleStyle}>{title}</h3>
            <p css={style.promptDescStyle}>{desc}</p>
          </div>
          <input
            ref={promptInputRef}
            css={style.promptInputStyle}
            value={defaultV}
            placeholder={placeholder}
          />
          <div css={style.promptButtonsStyle}>
            <button ref={promptCancelRef} css={style.promptCancelStyle}>
              {cancelTitle}
            </button>
            <button ref={promptOKRef} css={style.promptSubmitStyle}>
              {okTitle}
            </button>
          </div>
        </div>
      </div>
      {props.children}
    </PromptContext.Provider>
  );
};

export default Prompt;
export { usePrompt } from '../contexts/PromptContext';
