import { Plugin } from "../types";

const initialPlugins = {
  accessibility: false,
  lazyload: false,
  placeholder: false,
  responsive: false,
};

const getPluginType = (name: string) => name.replace('bound ', '').replace('Plugin', '');

export const isPluginUsed = (plugins: Plugin[] = [], pluginType: keyof typeof initialPlugins) => {
  const usedPlugins = plugins.reduce(
    (used, { name }) => ({ ...used, [getPluginType(name)]: true }),
    initialPlugins
  );
  return usedPlugins[pluginType];
};
