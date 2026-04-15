/**
 * SWF (Scientific Workflow) plugin for OpenCode.ai
 *
 * Auto-registers skills directory via config hook.
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const SwfPlugin = async ({ client, directory }) => {
  const swfSkillsDir = path.resolve(__dirname, '../../skills');

  return {
    config: async (config) => {
      config.skills = config.skills || {};
      config.skills.paths = config.skills.paths || [];
      if (!config.skills.paths.includes(swfSkillsDir)) {
        config.skills.paths.push(swfSkillsDir);
      }
    }
  };
};
