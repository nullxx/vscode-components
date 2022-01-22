import { css } from '@emotion/react';

export const promptContainerAbsStyle = css`
  position: absolute;
  top: 5px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  height: 115px;
  background-color: #26282e;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.6);
  z-index: 1;
  display: none;
  color: white;
`;

export const promptContainerStyle = css`
  position: relative;
  height: 100%;
`;

export const promptInputStyle = css`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top: 55px;
  width: 95%;
  background-color: #26282e;
  border: thin solid white;
  border-style: groove;
  color: white;
  &:focus {
    outline: none;
  }
`;

export const promptButtonsStyle = css`
  position: absolute;
  bottom: 6px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  height: 30px;
  width: 120px;
  cursor: pointer;
  display: flex;
  justify-content: space-around;
`;

export const promptSubmitStyle = css`
  width: 50px;
`;

export const promptCancelStyle = css`
  width: 60px;
`;

export const promptTextContainerStyle = css`
  position: relative;
  top: 5px;
  height: 40px;
  margin: 0 5px 0 5px;
`;

export const promptDescStyle = css`
  margin: 0;
  font-size: small;
  margin-top: 2px;
`;

export const promptTitleStyle = css`
  margin: 0;
`;

export const promptOverlayStyle = css`
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: not-allowed;
  z-index: 1;
`;
