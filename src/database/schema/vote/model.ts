import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { type VoteType } from './schema';
import db from './schema';

const create = ({ votePostId, votedOptionIndex, userId }: VoteType) =>
    db.create({ votePostId, votedOptionIndex, userId });

const findOne = (
    query: FilterQuery<VoteType>,
    projection?: ProjectionType<VoteType>,
    option?: QueryOptions<VoteType>,
): Promise<VoteType | null> =>
    db.findOne(query, projection, option).lean().exec();

const find = (
    filter: FilterQuery<VoteType>,
    projection: ProjectionType<VoteType>,
    option: QueryOptions<VoteType>,
): Promise<VoteType[] | null> =>
    db.find(filter, projection, option).lean().exec();

const updateOne = (
    filter: FilterQuery<VoteType>,
    update: Partial<VoteType>,
    option?: QueryOptions<VoteType>,
) => db.updateOne(filter, { $set: { ...update } }, option);

const updateMany = (
    filter: FilterQuery<VoteType>,
    update: Partial<VoteType>,
    option?: QueryOptions<VoteType>,
) => db.updateMany(filter, { $set: { ...update } }, option);

const deleteOne = (filter: FilterQuery<VoteType>, unset?: Partial<VoteType>) =>
    db.deleteOne(filter, { $unset: { ...unset } });

const deleteMany = (filter: FilterQuery<VoteType>, unset?: Partial<VoteType>) =>
    db.deleteOne(filter, { $unset: { ...unset } });

const voteModel = {
    create,
    findOne,
    find,
    updateOne,
    updateMany,
    deleteOne,
    deleteMany,
};

export default voteModel;
