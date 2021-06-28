import { Option } from './option';

export class Question {
    id: string;
    name: string;
    questionTypeId: number;
    options: Option[];
    answered: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.name = data.name;
        this.questionTypeId = data.questionTypeId;
        this.options = [];
        if (data.options) {
            data.options.forEach(o => {
                this.options.push(new Option(o));
            });
        }
    }
}
