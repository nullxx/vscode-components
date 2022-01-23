/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useRef, useState } from 'react';
import propTypes from 'prop-types';
import PromptContext, {
  PromptContextValue,
  PromptShowOptions,
  PromptShowResultOK,
} from '../contexts/PromptContext';
import * as style from '../styles/prompt.style';

const Prompt: React.FC = (props) => {
  const promptInputRef = useRef<HTMLInputElement>(null);
  const promptOKRef = useRef<HTMLButtonElement>(null);
  const promptCancelRef = useRef<HTMLButtonElement>(null);

  const [showOverlay, setShowOverlay] = useState(false);
  const [showContainerAbs, setShowContainerAbs] = useState(false);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [okTitle, setOkTitle] = useState('');
  const [cancelTitle, setCancelTitle] = useState('');

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
      promptInputRef.current.value = defaultValue; // to reset value
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

Prompt.propTypes = {
  children: propTypes.node,
};

export default Prompt;
export { usePrompt } from '../contexts/PromptContext';
