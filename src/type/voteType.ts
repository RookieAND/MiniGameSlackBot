export type VoteType = {
    title: '';
    options: VoteOptionType[];
    dueDate: Date;
};

export type VoteOptionType = { option: string; voted: number };
