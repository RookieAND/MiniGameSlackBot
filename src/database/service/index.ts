import votePostModel from '@/database/schema/vote-post/model';
import voteModel from '@/database/schema/vote/model';
import { Types } from 'mongoose';

export const getCurrentVoteCountPerOption = async ({
    votePostId,
}: {
    votePostId: string;
}) => {
    const votePostDoc = await votePostModel.findOne({
        _id: new Types.ObjectId(votePostId),
    });

    if (!votePostDoc) {
        throw new Error('존재하지 않는 Vote Post ID 입니다.');
    }

    const selectOptions = votePostDoc.options;

    const votedCountPerOption = await Promise.all(
        selectOptions.map(async ({ option, index }) => {
            const votedCount = await voteModel.countDocuments({
                votePostId,
                VoteOptionType: index,
            });
            return { option, index, votedCount };
        }),
    );

    return votedCountPerOption;
};
