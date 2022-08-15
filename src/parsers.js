import yaml from 'js-yaml';

const parsers = (file, format) => {
  if (format === 'json') {
    return JSON.parse(file);
  } else if (format === 'yml') {
    return yaml.load(file);
  }
};

export default parsers;
