import { View, KnownBlock } from '@slack/bolt';

/**
 * 사용자가 입력한 선택지를 기반으로 Block 을 생성하는 createSelectionBlock
 * @param {string} selectOption 선택지
 * @param {number} index 선택지 인덱스
 * @returns {KnownBlock} 생성된 선택지 Block
 */
const createSelectionBlock = (selectOption: string, index: number): KnownBlock => ({
    type: 'section',
    text: {
        type: 'mrkdwn',
        text: `*${index + 1}.* ${selectOption}`,
    },
    accessory: {
        type: 'button',
        text: {
            type: 'plain_text',
            text: '항목 삭제',
        },
        style: 'danger',
        value: `${selectOption}`,
        action_id: 'remove_selection',
    },
});

/**
 * 투표글 생성을 돕는 Modal 을 생성하는 함수 createVoteModal
 * @param {string[]} selectOptionList 사용자가 입력한 선택지 목록
 * @returns {View} 생성된 투표글 Modal View
 */
export const createVoteModal = (selectOptionList: string[] = []): View => {
    const privateMetadata = JSON.stringify(selectOptionList);

    return {
        type: 'modal',
        callback_id: 'vote_modal',
        clear_on_close: true,
        title: {
            type: 'plain_text',
            text: '투표 글 생성',
        },
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'mrkdwn',
                    text: '📥 새로운 *투표글* 생성을 진행합니다!',
                },
            },
            {
                type: 'divider',
            },
            {
                type: 'input',
                block_id: 'title',
                element: {
                    type: 'plain_text_input',
                    action_id: 'plain_text_input-action',
                    placeholder: {
                        type: 'plain_text',
                        text: '투표 주제를 기입해주세요.',
                        emoji: true,
                    },
                },
                label: {
                    type: 'plain_text',
                    text: '1️⃣ 투표글 주제를 입력해주세요!',
                    emoji: true,
                },
            },
            {
                dispatch_action: true,
                type: 'input',
                element: {
                    type: 'plain_text_input',
                    action_id: 'add_selection',
                    placeholder: {
                        type: 'plain_text',
                        text: '새로운 항목을 기입해주세요.',
                        emoji: true,
                    },
                },
                label: {
                    type: 'plain_text',
                    text: '2️⃣ 투표 선택 항목을 입력해주세요!',
                    emoji: true,
                },
            },
            ...selectOptionList.map((selectOption, index) =>
                createSelectionBlock(selectOption, index),
            ),
            {
                type: 'input',
                block_id: 'dueDate',
                element: {
                    type: 'datepicker',
                    initial_date: '2023-12-06',
                    placeholder: {
                        type: 'plain_text',
                        text: '투표 마감 기한',
                        emoji: true,
                    },
                    action_id: 'datepicker-action',
                },
                label: {
                    type: 'plain_text',
                    text: '3️⃣ 투표 마감 기한을 설정해주세요',
                    emoji: true,
                },
            },
        ],
        close: {
            type: 'plain_text',
            text: '취소하기',
        },
        submit: {
            type: 'plain_text',
            text: '제출하기',
        },
        private_metadata: privateMetadata,
    };
};
