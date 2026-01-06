export enum ButtonType {
  Number = 'number',
  Operator = 'operator',
  Action = 'action',
  Scientific = 'scientific'
}

export enum ButtonVariant {
  Default = 'default',
  Primary = 'primary',
  Secondary = 'secondary',
  Accent = 'accent'
}

export interface CalculatorState {
  currentValue: string;
  previousValue: string | null;
  operator: string | null;
  history: string[];
  isNewNumber: boolean;
}

export interface SolveResult {
  answer: string;
  explanation: string;
}