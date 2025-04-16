import type { TPreset, TPlugin } from 'librechat-data-provider';
import { EModelEndpoint } from 'librechat-data-provider';

type TEndpoints = Array<string | EModelEndpoint>;

export const getPresetTitle = (preset: TPreset, mention?: boolean): string => {
  const {
    endpoint,
    title: presetTitle,
    model,
    tools,
    promptPrefix,
    chatGptLabel,
    modelLabel,
  } = preset;

  const modelInfo = model ?? '';
  let title = '';
  let label = '';

  const usesChatGPTLabel: TEndpoints = [
    EModelEndpoint.azureOpenAI,
    EModelEndpoint.openAI,
    EModelEndpoint.custom,
  ];
  const usesModelLabel: TEndpoints = [EModelEndpoint.google, EModelEndpoint.anthropic];

  if (endpoint && usesChatGPTLabel.includes(endpoint)) {
    label = chatGptLabel ?? '';
  } else if (endpoint && usesModelLabel.includes(endpoint)) {
    label = modelLabel ?? '';
  }

  if (label && presetTitle?.trim() && label.toLowerCase().includes(presetTitle.toLowerCase())) {
    title = `${label}: `;
    label = '';
  } else if (presetTitle?.trim() && presetTitle.trim() !== 'New Chat') {
    title = `${presetTitle}: `;
  }

  // Leo mode → show compact + context if needed
  if (mention === true) {
    const extras = [];

    if (label) extras.push(label);
    if (promptPrefix) extras.push(promptPrefix);
    if (tools && tools.length > 0) {
      const toolNames = tools.map((tool) =>
        typeof tool === 'string' ? tool : tool.pluginKey,
      );
      extras.push(toolNames.join(', '));
    }

    return [modelInfo, ...extras].filter(Boolean).join(' | ');
  }

  return `${title}${modelInfo}${label ? ` (${label})` : ''}`.trim();
};

/** Remove unavailable tools from the preset */
export const removeUnavailableTools = (
  preset: TPreset,
  availableTools: Record<string, TPlugin | undefined>,
): TPreset => {
  const newPreset = { ...preset };

  if (Array.isArray(newPreset.tools)) {
    newPreset.tools = newPreset.tools
      .filter((tool) => {
        const pluginKey = typeof tool === 'string' ? tool : tool.pluginKey;
        return !!availableTools[pluginKey];
      })
      .map((tool) => (typeof tool === 'string' ? tool : tool.pluginKey));
  }

  return newPreset;
};
