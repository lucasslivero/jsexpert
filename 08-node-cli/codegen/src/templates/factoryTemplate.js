import Util from "../util.js";

const componentNameAnchor = "$$componentName";

const serviceDepAnchor = "$$serviceNameDep";
const repositoryDepAnchor = "$$repositoryNameDep";

const serviceNameAnchor = "$$serviceName";
const repositoryNameAnchor = "$$repositoryName";

const template = `
import $$serviceName from '../service/$$serviceNameDep.js'
import $$repositoryName from '../repository/$$repositoryNameDep.js'

export default class $$componentNameFactory {

  static getInstance() {
    const repository = new $$repositoryName()
    const service = new $$serviceName({ repository })

    return service
  }
}`;

export function factoryTemplate(componentName, repositoryName, serviceName) {
  const textFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(serviceDepAnchor, Util.lowerCaseFirstLetter(serviceName))
    .replaceAll(repositoryDepAnchor, Util.lowerCaseFirstLetter(repositoryName))
    .replaceAll(serviceNameAnchor, Util.upperCaseFirstLetter(serviceName))
    .replaceAll(repositoryNameAnchor, Util.upperCaseFirstLetter(repositoryName));

  return {
    fileName: `${componentName}Factory`,
    template: textFile,
  };
}
