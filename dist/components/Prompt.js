var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/** @jsx jsx */
import { jsx } from '@emotion/react'; // to avoid unused var
import React from 'react';
import PromptContext from '../contexts/PromptContext';
import * as style from '../styles/prompt.style';
// TODO: IN PROGRESS https://sh.nullx.me/rilez
var Prompt = function (props) {
    var overlayRef = React.createRef();
    var promptContainerAbsRef = React.createRef();
    var promptContainerRef = React.createRef();
    var promptTextContainerRef = React.createRef();
    var promptButtonsRef = React.createRef();
    var promptTitleRef = React.createRef();
    var promptDescRef = React.createRef();
    var promptInputRef = React.createRef();
    var promptOKRef = React.createRef();
    var promptCancelRef = React.createRef();
    var promptShow = function (_a) {
        var title = _a.title, message = _a.message, buttons = _a.buttons, _b = _a.placeholder, placeholder = _b === void 0 ? '' : _b, _c = _a.defaultValue, defaultValue = _c === void 0 ? '' : _c;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_d) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (!promptCancelRef.current ||
                            !promptOKRef.current ||
                            !promptInputRef.current ||
                            !promptTitleRef.current ||
                            !promptDescRef.current ||
                            !promptButtonsRef.current ||
                            !promptContainerRef.current ||
                            !promptContainerAbsRef.current ||
                            !promptTextContainerRef.current ||
                            !overlayRef.current)
                            return reject(new Error('Prompt is not ready'));
                        var dispose = function (success) {
                            if (success === void 0) { success = true; }
                            if (!overlayRef.current || !promptContainerAbsRef.current)
                                throw new Error('Prompt is not ready');
                            overlayRef.current.style.display = 'none';
                            promptContainerAbsRef.current.style.display = 'none';
                            if (success && promptInputRef.current)
                                return resolve({ value: promptInputRef.current.value });
                            else if (!promptInputRef.current) {
                                return reject(new Error('Prompt input is not defined'));
                            }
                            return reject(new Error('Canceled'));
                        };
                        promptCancelRef.current.onclick = function () { return dispose(false); };
                        promptOKRef.current.onclick = function () { return dispose(true); };
                        promptInputRef.current.onkeyup = function (e) {
                            if (e.key === 'Enter') {
                                dispose();
                            }
                            else if (e.key === 'Escape') {
                                dispose(false);
                            }
                        };
                        if (buttons.includes('CANCEL')) {
                            promptCancelRef.current.style.display = 'block';
                        }
                        if (buttons.includes('OK')) {
                            promptOKRef.current.style.display = 'block';
                        }
                        promptTitleRef.current.textContent = title;
                        promptDescRef.current.textContent = message;
                        promptInputRef.current.value = defaultValue;
                        promptInputRef.current.placeholder = placeholder;
                        promptContainerAbsRef.current.style.display = 'block';
                        overlayRef.current.style.display = 'block';
                    })];
            });
        });
    };
    var promptValue = [promptShow];
    return (jsx(PromptContext.Provider, { value: promptValue },
        jsx("div", { ref: overlayRef, css: style.promptOverlayStyle }),
        jsx("div", { ref: promptContainerAbsRef, css: style.promptContainerAbsStyle },
            jsx("div", { ref: promptContainerRef, css: style.promptContainerStyle },
                jsx("div", { ref: promptTextContainerRef, css: style.promptTextContainerStyle },
                    jsx("h3", { ref: promptTitleRef, css: style.promptTitleStyle }, "Title"),
                    jsx("p", { ref: promptDescRef, css: style.promptDescStyle }, "Desc")),
                jsx("input", { ref: promptInputRef, css: style.promptInputStyle }),
                jsx("div", { ref: promptButtonsRef, css: style.promptButtonsStyle },
                    jsx("button", { ref: promptCancelRef, css: style.promptCancelStyle }, "Cancel"),
                    jsx("button", { ref: promptOKRef, css: style.promptSubmitStyle }, "Ok")))),
        props.children));
};
export default Prompt;
export { usePrompt } from '../contexts/PromptContext';
//# sourceMappingURL=Prompt.js.map