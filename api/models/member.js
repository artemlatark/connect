import mongoose from 'mongoose';
import i18n from 'i18n';

import { dbAccount } from 'shared/db';
import { formatNumber } from 'shared/utils';

const Schema = mongoose.Schema;

const Member = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	studio: {
		type: Schema.Types.ObjectId,
		ref: 'Studio',
		required: [true, i18n.__('Обязательное поле')],
		select: false,
	},
	invitationCode: {
		type: String,
	},
	roles: [
		{
			type: String,
			enum: ['owner', 'admin', 'artist'],
		},
	],
	confirmed: {
		type: Boolean,
		default: false,
	},
	deactivated: {
		type: Boolean,
		default: true,
	},
	invitationDate: {
		type: Date,
		default: Date.now,
	},
	guest: {
		type: Boolean,
	},
	accessExpires: {
		type: Date,
	},
	purchaseExpenseStudio: {
		type: Boolean,
		default: false,
	},
	markupPosition: {
		type: Boolean,
		default: true,
	},
	billingFrequency: {
		type: Number,
		enum: [1, 7, 30],
		default: 7,
	},
	lastBillingDate: {
		type: Date,
	},
	nextBillingDate: {
		type: Date,
	},
	billingDebt: {
		type: Number,
		min: [0, 'Не может быть меньше 0'],
		default: 0,
		set: value => formatNumber(value),
	},
	billingPeriodDebt: {
		type: Number,
		min: [0, 'Не может быть меньше 0'],
		default: 0,
		set: value => formatNumber(value),
	},
	billingPeriodWriteOffs: {
		type: [
			{
				type: Schema.Types.ObjectId,
				ref: 'WriteOff',
			},
		],
		select: false,
	},
	__v: {
		type: Number,
		select: false,
	},
});

export default dbAccount.model('Member', Member);
