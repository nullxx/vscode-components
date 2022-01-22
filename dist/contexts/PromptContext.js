import { createContext, useContext } from 'react';
var PromptContext = createContext([]);
export var usePrompt = function () {
    return useContext(PromptContext);
};
export default PromptContext;
//# sourceMappingURL=PromptContext.js.map