import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Grid from '@material-ui/core/Grid';

import { capitalize } from 'src/helpers/utils';

import Symbols from './Symbols';

import { Avatar } from './styles';
import styles from './index.module.css';

/**
 * avatar - Если true, будет показываться аватар
 *
 * name - Наименование позиции
 *
 * characteristics - характеристики позиции
 *
 * badges - иконки статусов ( archived | archiving-after-ended | canceled | delivery-is-expected | replaceable )
 *
 * childPosition - данные заменяемой позиции
 *
 * size - размер ( sm | md | lg )
 *
 * minHeight - Если true, минимальный размер компонента будет равен 36px. Применяется только на размере sm
 *
 */
const PositionSummary = props => {
	const { className, avatar, src, name, characteristics, badges, childPosition, size, minHeight, ...remainingProps } = props;

	if (!name) return null;

	const classes = ClassNames(className, styles.container, styles[`size${capitalize(size)}`], {
		[styles.minHeight]: minHeight && size === 'sm',
	});

	return (
		<div className={classes} {...remainingProps}>
			{avatar ? (
				<Avatar className={styles.avatar} src={src} size={size} variant="rounded">
					<FontAwesomeIcon className={styles.avatarFallback} icon={['fad', 'box-alt']} style={{ '--fa-secondary-opacity': 0 }} />
				</Avatar>
			) : null}
			<Grid className={styles.summary} direction="column" container>
				{size === 'sm' ? (
					<div className={styles.name}>{name}</div>
				) : (
					<div className={styles.nameWithSymbols}>
						<span className={styles.name}>{name}</span>
						<Symbols badges={badges} childPosition={childPosition} />
					</div>
				)}
				{characteristics?.length ? (
					<div className={styles.characteristics}>
						{characteristics.reduce(
							(characteristics, characteristic) => (characteristics ? `${characteristics}, ` : '') + characteristic.name,
							''
						)}
					</div>
				) : null}
			</Grid>
			{size === 'sm' ? <Symbols badges={badges} childPosition={childPosition} /> : null}
		</div>
	);
};

PositionSummary.defaultProps = {
	avatar: false,
	size: 'sm',
	minHeight: false,
};

PositionSummary.propTypes = {
	className: PropTypes.string,
	avatar: PropTypes.bool,
	src: PropTypes.string,
	name: PropTypes.string.isRequired,
	characteristics: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
		})
	),
	badges: PropTypes.array,
	childPosition: PropTypes.object,
	size: PropTypes.oneOf(['sm', 'md', 'lg']),
	minHeight: PropTypes.bool,
};

export default PositionSummary;
