import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DomainDocument = Domain & Document;

@Schema({
  toJSON: { virtuals: true },
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Domain {
  @Prop({
    type: String,
    trim: true,
    lowercase: true,
    required: [true, 'domainName field must be defined'],
    unique: true,
  })
  domainName: string;

  @Prop({
    type: Types.ObjectId,
    required: [true, 'ownerId field must be defined'],
  })
  ownerId: Types.ObjectId;

  @Prop({
    type: String,
  })
  ownerName: string;
}

export const DomainSchema = SchemaFactory.createForClass(Domain);

DomainSchema.index(
  { domainName: 1 },
  {
    unique: true,
    partialFilterExpression: {
      role: { $eq: 'Domain' },
    },
  },
);
