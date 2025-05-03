export type Operator = '=' | '!=' | '<' | '<=' | '>' | '>=' | 'include' | 'exclude';

export interface Condition {
    // the name of the value
    name: string;
    // the value to check against
    target: string;
    // the operator to use
    operator: Operator;
}

export interface EventSignupElementText {
    type: 'text';
    text: string;
    conditions: Condition[];
    color: 'regular' | 'warning';
}

export interface EventSignupQuestionCheckbox {
    type: 'checkbox';
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

export interface EventSignupElementQuestion {
    type: 'question';
    // conditions under which this question will show
    conditions: Condition[];
    question: string;
    id: string;
    body: EventSignupQuestionBody;
}

export type EventSignupElement = EventSignupElementText | EventSignupElementQuestion;

export interface EventSignupForm {
    elements: EventSignupElement[];
}
