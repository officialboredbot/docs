import defaultMdxComponents from "fumadocs-ui/mdx";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";

export function getMDXComponents(components = {}) {
  return {
    ...defaultMdxComponents,
    Accordion,
    Accordions,
    Step,
    Steps,
    Tab,
    Tabs,
    ...components
  };
}
