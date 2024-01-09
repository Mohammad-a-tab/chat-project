import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Types } from 'mongoose';

@Schema()
export class User {
  _id: Types.ObjectId;
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: Array<string> })
  roles: Array<string>;

  @Prop({ required: true, type: Array<string> })
  permissions: Array<string>;
}

export const UserSchema = SchemaFactory.createForClass(User);
