import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
import { type VoteType } from './schema';
import db from './schema';

const create = ({ title, userId, options, dueDate }: VoteType) =>
    db.create({ title, userId, options, dueDate });

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

const voteModel = {
    create,
    findOne,
    find,
    updateOne,
    updateMany,
};

export default voteModel;
