export type Operator = '=' | '!=' | '<' | '<=' | '>' | '>=' | 'include' | 'exclude';

export type Condition = {id:number} & ({
    type : 'value';
    // the name of the value
    name: string;
    // the value to check against
    target: string;
    // the operator to use
    operator: Operator;
} | {
    type: 'connection';
    connector: '(' | ')' | 'and' | 'or' | 'not';
})

export interface EventSignupElementText {
    type: 'text';
    text: string;
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
    question: string;
    id: string;
    body: EventSignupQuestionBody;
}

export type EventSignupElement = (EventSignupElementText | EventSignupElementQuestion) & {
    conditions: Condition[];
};

export interface EventSignupForm {
    elements: EventSignupElement[];
}
