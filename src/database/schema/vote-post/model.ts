import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { type VotePostType } from './schema';
import db from './schema';

const create = ({ title, userId, options, dueDate }: VotePostType) =>
    db.create({ title, userId, options, dueDate });

const findOne = (
    query: FilterQuery<VotePostType>,
    projection?: ProjectionType<VotePostType>,
    option?: QueryOptions<VotePostType>,
): Promise<VotePostType | null> =>
    db.findOne(query, projection, option).lean().exec();

const find = (
    filter: FilterQuery<VotePostType>,
    projection: ProjectionType<VotePostType>,
    option: QueryOptions<VotePostType>,
): Promise<VotePostType[] | null> =>
    db.find(filter, projection, option).lean().exec();

const updateOne = (
    filter: FilterQuery<VotePostType>,
    update: Partial<VotePostType>,
    option?: QueryOptions<VotePostType>,
) => db.updateOne(filter, { $set: { ...update } }, option);

const updateMany = (
    filter: FilterQuery<VotePostType>,
    update: Partial<VotePostType>,
    option?: QueryOptions<VotePostType>,
) => db.updateMany(filter, { $set: { ...update } }, option);

const voteModel = {
    create,
    findOne,
    find,
    updateOne,
    updateMany,
};

export default voteModel;
