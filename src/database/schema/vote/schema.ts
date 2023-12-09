import { Schema, model } from 'mongoose';

export type VoteOptionType = {
    /**
     * 선택지 항목
     */
    option: string;
    /**
     * 선택지 Index
     */
    index: number;
};

const VoteOptionSchema = new Schema<VoteOptionType>({
    option: { type: String },
    index: { type: Number },
});

export interface VoteType {
    /**
     * 투표 주제
     */
    title: string;
    /**
     * 투표 선택지 목록
     */
    options: VoteOptionType[];
    /**
     * 투표 마감일
     */
    dueDate: Date;
    /**
     * 투표 생성 유저 id
     */
    userId: string;
}

const schema = new Schema<VoteType>(
    {
        title: { type: String, required: true },
        options: { type: [VoteOptionSchema], required: true },
        dueDate: { type: Date, required: true },
        userId: { type: String, required: true },
    },
    {
        collection: 'votes',
        timestamps: true,
    },
);

export default model<VoteType>('vote', schema);
