export interface EventSignupForm {
    elements: (
        | {
              type: 'text';
              text: string;
              color: 'regular' | 'warning';
          }
        | {
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
    )[];
}
