import { App as SlackBotApp } from '@slack/bolt';
import dotenv from 'dotenv';

const { SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET } = process.env;

dotenv.config();

const slackBotApp = new SlackBotApp({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
});

slackBotApp
  .start(process.env.APP_PORT || 3000)
  .then(() => console.log('Slack Bot Started!'))
  .catch(() => console.error('An Error is occurred while launching Slack Bot'));
