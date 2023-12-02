import { App as SlackBotApp } from '@slack/bolt';
import dotenv from 'dotenv';

dotenv.config();

const { SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET, SLACK_APP_TOKEN } = process.env;

const slackBotApp = new SlackBotApp({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  appToken: SLACK_APP_TOKEN,
  socketMode: true,
});

slackBotApp
  .start(process.env.APP_PORT || 3000)
  .then(() => console.log('Slack Bot Started!'));
