import { slackBotApp } from '@/app';
import { createVoteModal } from '@/modal';
import { PlainTextInputAction } from '@slack/bolt';

/**
 * 새로운 선택지를 입력했을 경우 발동되는 Action 을 처리하는 함수 handleAddSelectOption
 */
export const handleAddSelectOption = () => {
    slackBotApp.action(
        'add_selection',
        async ({ ack, body, client, logger }) => {
            await ack();
            try {
                if (body.type !== 'block_actions' || !body.view) return;
                if (body.actions[0].type !== 'plain_text_input') return;

                const [action] = body.actions;
                const privateMetadata = body.view.private_metadata;
                const prevSelectOptions = privateMetadata
                    ? JSON.parse(privateMetadata)
                    : [];
                const newSelectOption = action.value;

                const result = await client.views.update({
                    view_id: body.view.id,
                    hash: body.view.hash,
                    view: createVoteModal([
                        ...prevSelectOptions,
                        newSelectOption,
                    ]),
                });
            } catch (error) {
                logger.error(error);
            }
        },
    );
};

/**
 * 새로운 선택지를 입력했을 경우 발동되는 Action 을 처리하는 함수 handleAddSelectOption
 */
export const handleRemoveSelectOption = () => {
    slackBotApp.action(
        'remove_selection',
        async ({ ack, body, client, logger }) => {
            await ack();
            try {
                if (body.type !== 'block_actions' || !body.view) return;
                if (body.actions[0].type !== 'button') return;

                const prevSelectOptions: string[] = JSON.parse(
                    body.view.private_metadata,
                );
                const deletedSelectOption = body.actions[0].value;
                const updatedSelectOptions = prevSelectOptions.filter(
                    (selectOption) => selectOption !== deletedSelectOption,
                );

                const result = await client.views.update({
                    view_id: body.view.id,
                    hash: body.view.hash,
                    view: createVoteModal(updatedSelectOptions),
                });
            } catch (error) {
                logger.error(error);
            }
        },
    );
};
