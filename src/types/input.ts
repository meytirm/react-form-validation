export type InputInstanceType = {
  validate: () => boolean;
  reset: () => void;
}

export type RuleType = (value: string) => boolean | string