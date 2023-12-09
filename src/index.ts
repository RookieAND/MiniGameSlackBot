import { App } from '@slack/bolt';
import dotenv from 'dotenv';

import { handleAddSelectOption, handleRemoveSelectOption } from '@/action';
import { registerVoteShortCut } from '@/command';
import { connectMongoDB } from '@/database/connection';

dotenv.config();

const { SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET, SLACK_APP_TOKEN } = process.env;

export const slackBotApp = new App({
    token: SLACK_BOT_TOKEN,
    signingSecret: SLACK_SIGNING_SECRET,
    appToken: SLACK_APP_TOKEN,
    socketMode: true,
});

const bootstrapSlackBot = async () => {
    handleAddSelectOption();
    handleRemoveSelectOption();
    registerVoteShortCut();
};

(async () => {
    await connectMongoDB();
    await slackBotApp.start();
    await bootstrapSlackBot();
})();
