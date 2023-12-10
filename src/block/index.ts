import dayjs from 'dayjs';

import { View, KnownBlock } from '@slack/bolt';

/**
 * 투표글 생성 완료 알림 내용을 담은 Block 을 생성하는 함수 createCompletionBlock
 * @param param.selectOptions 사용자가 기입한 선택지 목록
 * @param param.title 사용자가 기입한 제목
 * @param param.dueDateSecond 사용자가 설정한 종료 일자 시간 (epoch time)
 * @returns 생성된 투표글 생성 완료 메세지 블럭
 */
export const createCompletionBlock = ({
    title,
    dueDateSecond,
    selectOptions,
}: {
    title: string;
    dueDateSecond: number;
    selectOptions: string[];
}): KnownBlock[] => [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '📥 새로운 *투표글* 생성을 완료했습니다!',
        },
    },
    {
        type: 'divider',
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `📋 *투표 주제* : ${title}`,
        },
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `📆 *마감 기한* : ${dayjs(dueDateSecond * 1000).format(
                'YYYY년 MM월 DD일 HH시 mm분',
            )}`,
        },
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '🗳 *선택 항목* :',
        },
        fields: selectOptions.map((option, index) => ({
            type: 'plain_text',
            text: `📌 ${index + 1}. ${option}`,
            emoji: true,
        })),
    },
];

/**
 * 사용자가 입력한 선택지를 기반으로 Block 을 생성하는 createSelectionBlock
 * @param {string} param.selectOption 선택지
 * @param {number} param.index 선택지 인덱스
 * @returns {KnownBlock} 생성된 선택지 Block
 */
const createSelectionBlock = ({
    selectOption,
    index,
}: {
    selectOption: string;
    index: number;
}): KnownBlock => ({
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
                type: 'input',
                block_id: 'add_select_input',
                dispatch_action: true,
                optional: true,
                element: {
                    type: 'plain_text_input',
                    action_id: 'add_selection',
                    placeholder: {
                        type: 'plain_text',
                        text: '새로운 항목을 기입해주세요.',
                        emoji: true,
                    },
                    initial_value: '',
                },
                label: {
                    type: 'plain_text',
                    text: '2️⃣ 투표 선택 항목을 입력해주세요!',
                    emoji: true,
                },
            },
            ...selectOptionList.map((selectOption, index) =>
                createSelectionBlock({ selectOption, index }),
            ),
            {
                type: 'input',
                block_id: 'dueDate',
                element: {
                    type: 'datetimepicker',
                    initial_date_time: Math.floor(Date.now() / 1000),
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

/**
 * 투표글 메세지 Block을 생성하는 함수 createVotePostBlock
 */
export const createVotePostBlock = ({
    title,
    userName,
    dueDateSecond,
    selectOptions,
}: {
    title: string;
    userName: string;
    dueDateSecond: number;
    selectOptions: string[];
}): KnownBlock[] => [
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '📥 새로운 *투표글* 이 생성되었습니다!',
        },
    },
    {
        type: 'divider',
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `📋 *투표 주제* : ${title}`,
        },
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `👋 *발의자* : ${userName}`,
        },
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: `📆 *마감 기한* : ${dayjs(dueDateSecond * 1000).format(
                'YYYY년 MM월 DD일 HH시 mm분',
            )}`,
        },
    },
    {
        type: 'divider',
    },
    {
        type: 'section',
        text: {
            type: 'mrkdwn',
            text: '🗳 *선택 항목* :',
        },
    },
    ...selectOptions.map(
        (option, index): KnownBlock => ({
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: `*${index + 1}.* ${option} (3표)`,
            },
            accessory: {
                type: 'button',
                text: {
                    type: 'plain_text',
                    text: '투표 진행',
                },
                value: `${index}`,
                action_id: 'vote_option',
            },
        }),
    ),
];
