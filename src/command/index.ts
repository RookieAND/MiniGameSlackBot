import { slackBotApp } from '@/app';
import { createVoteModal } from '@/modal';

/**
 * 투표 생성 ShortCut 을 생성하는 함수 registerVoteShortCut
 */
export const registerVoteShortCut = () => {
    slackBotApp.shortcut(
        'create_new_vote',
        async ({ client, ack, body, logger }) => {
            await ack();
            try {
                const result = await client.views.open({
                    trigger_id: body.trigger_id,
                    view: createVoteModal(),
                });
            } catch (error) {
                logger.error(error);
            }
        },
    );
};
