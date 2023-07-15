interface Option {
    optionId: string;
    option: string;
}

interface Vote {
    question: string;
    limit: string;
    options: Array<Option>;
    voteId: string;
    author: string;
}

export type {
    Option,
    Vote
}