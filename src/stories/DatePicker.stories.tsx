import DatePicker from "@sharedcomponents/DatePicker";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

export default {
    title: "Shared/DatePicker/DatePickerDark",
    component: DatePicker,
    parameters: {
        backgrounds: {
            default: "dark",
        },
    },
    argTypes: {
        value: {
            type: "string",
            description: "Date formatted 2022-11-30",
        },
        error: {
            type: "boolean",
            description: "If error, border-color red, otherwise - blue",
        },
        onChange: {
            type: "function",
            description: "Function recieves Dayjs | null argument type",
        },
        onKeyDown: {
            type: "function",
            description: "Function handle keystroke",
        },
    },
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => {
    return <DatePicker {...args} />;
};
export const Primary = Template.bind({});
Primary.args = {
    value: "2022-11-30",
    error: false,
};

// export const usablePrimary: React.FC = () => {
//     const [date, setDate] = useState<string>("2022-11-28");
//     const [error, setError] = useState<boolean>(false);

//     const onChange = (date: Dayjs | null) => {
//         if (date?.format() === "Invalid Date" || date?.format() === undefined) {
//             setError(true);
//             return;
//         }
//         const parsedDate = date && Date.parse(date.format());
//         if (parsedDate) {
//             setDate(date.format());
//             setError(false);
//         }
//     };
//     return <DatePicker value={date} error={error} onChange={onChange} />;
// };
