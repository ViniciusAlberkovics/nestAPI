import { ImageModel } from './image.model';
import { AudioModel } from './audio.model';

export class MessageModel{
    public _id: string;
    public idOrigin: string;
    public idDestiny: string;
    public text: string;
    public imgs: Array<ImageModel>;
    public audio: Array<AudioModel>
}