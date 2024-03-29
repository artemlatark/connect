import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Formik } from 'formik';

import { Dialog, DialogTitle } from 'src/components/Dialog';
import { withCurrentUser } from 'src/components/withCurrentUser';

import { editPersonalInfo } from 'src/actions/user';
import { enqueueSnackbar } from 'src/actions/snackbars';

import PersonalInfoForm from './PersonalInfoForm';
import personalInfoSchema from './personalInfoSchema';

function PersonalInfoEdit(props) {
	const { dialogOpen, onCloseDialog, currentUser } = props;

	const initialValues = {
		name: currentUser.name,
	};

	const onSubmit = async values => {
		const { onCloseDialog } = props;

		const personalInfo = personalInfoSchema.cast(values);

		try {
			await props.editPersonalInfo(personalInfo);

			onCloseDialog();
		} catch (error) {
			props.enqueueSnackbar({
				message: error.data.message || 'Неизвестная ошибка.',
				options: {
					variant: 'error',
				},
			});
		}
	};

	return (
		<Dialog open={dialogOpen} onClose={onCloseDialog} maxWidth="md">
			<DialogTitle onClose={onCloseDialog} theme="noTheme">
				Личная информация
			</DialogTitle>
			<Formik
				initialValues={initialValues}
				validationSchema={personalInfoSchema}
				validateOnBlur={false}
				validateOnChange={false}
				onSubmit={onSubmit}
			>
				{formikProps => <PersonalInfoForm onCloseDialog={onCloseDialog} formikProps={formikProps} />}
			</Formik>
		</Dialog>
	);
}

PersonalInfoEdit.propTypes = {
	dialogOpen: PropTypes.bool.isRequired,
	onCloseDialog: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
	return {
		editPersonalInfo: personalInfo => dispatch(editPersonalInfo({ data: { personalInfo } })),
		enqueueSnackbar: (...args) => dispatch(enqueueSnackbar(...args)),
	};
};

export default compose(connect(null, mapDispatchToProps), withCurrentUser)(PersonalInfoEdit);
