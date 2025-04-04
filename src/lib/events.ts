export interface EventSignupElementText {
    type: 'text';
    text: string;
    conditions: { name: string; target: string; negate: boolean }[];
    color: 'regular' | 'warning';
}

export interface EventSignupElementQuestion {
    type: 'question';
    // conditions under which this question will show
    conditions: { name: string; target: string; negate: boolean }[];
    name: string;
    body:
        | {
              type: 'checkbox';
              // bind to one of the booleans
              bind: string;
          }
        | {
              type: 'input';
          }
        | {
              type: 'select';
              options: string[];
          };
}

export interface EventSignupQuestionCheckbox {
    type: 'checkbox';
    // bind to one of the booleans
    bind: string;
}

export interface EventSignupQuestionInput {
    type: 'input';
}

export interface EventSignupQuestionSelect {
    type: 'select';
    options: string[];
}

export type EventSignupQuestionBody =
    | EventSignupQuestionCheckbox
    | EventSignupQuestionInput
    | EventSignupQuestionSelect;

export interface EventSignupQuestion {
    type: 'question';
    // conditions under which this question will show
    conditions: { name: string; target: string; negate: boolean }[];
    name: string;
    body: EventSignupQuestionBody;
}

export type EventSignupElement = EventSignupElementText | EventSignupElementQuestion;

export interface EventSignupForm {
    elements: EventSignupElement[];
}
