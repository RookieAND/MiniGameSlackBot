import { Schema, model } from 'mongoose';

export interface VoteType {
    /**
     * 투표글 Id
     */
    votePostId: string;
    /**
     * 투표를 진행한 유저 Id
     */
    userId: string;
    /**
     * 투표를 진행한 선택자 index
     */
    votedOptionIndex: number;
}

const schema = new Schema<VoteType>(
    {
        votePostId: { type: String, required: true },
        userId: { type: String, required: true },
        votedOptionIndex: { type: Number, required: true },
    },
    {
        collection: 'votes',
        timestamps: true,
    },
);

schema.index({ votePostId: 1, votedOptionIndex: 1 });

export default model<VoteType>('vote', schema);
