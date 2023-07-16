interface User {
    userName: string;
    voteCount: number;
}

interface ResultOption {
    option: string;
    totalCount: number;
    votedUser: Array<User>;
}

interface Result {
    options: Array<ResultOption>;
}

export type {
    User,
    ResultOption,
    Result
}