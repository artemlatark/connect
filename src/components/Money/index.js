import React from 'react';

import NumberFormat, { moneyFormatProps } from 'src/components/NumberFormat';

import styles from './index.module.css';

const Money = props => {
	const { value } = props;

	return (
		<NumberFormat
			value={Number(value).toFixed(2)}
			renderText={value => {
				const moneyArray = value.split('.');

				return (
					<span className={styles.money}>
						{moneyArray[0]}
						{moneyArray[1] !== undefined ? ',' : null}
						<span className={styles.smalls}>
							{moneyArray[1] !== undefined ? `${moneyArray[1]}` : null}
							&nbsp;₽
						</span>
					</span>
				);
			}}
			displayType="text"
			{...moneyFormatProps}
		/>
	);
};

export default Money;
