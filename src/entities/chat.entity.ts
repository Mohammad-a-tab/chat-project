import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';

@Schema()
export class Message {
  @Prop({
    type: mongoose.Types.ObjectId,
    ref: 'user',
  })
  sender: mongoose.Types.ObjectId;

  @Prop({ type: String })
  message: string;

  @Prop({ type: String })
  dataTime: string;
}
@Schema()
export class Room {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: [Message] })
  messages: [Message];
}
@Schema()
export class Conversation {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  namespace: string;

  @Prop({ type: [Room] })
  rooms: [Room];
}

export const UserSchema = SchemaFactory.createForClass(Conversation);
