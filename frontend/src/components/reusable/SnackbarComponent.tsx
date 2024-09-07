import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useSnackbarStore } from "../../stores/snackbarStore";
import { SnackbarCloseReason } from "@mui/material/Snackbar";

const SnackbarComponent: React.FC = () => {
	const { isOpen, message, severity, closeSnackbar } = useSnackbarStore();

	// Adjust the onClose handler for Snackbar (event + reason)
	const handleSnackbarClose = (
		event: React.SyntheticEvent | Event,
		reason: SnackbarCloseReason
	) => {
		if (reason === "clickaway") {
			return; // Ignore clickaway events for Snackbar
		}
		closeSnackbar(); // Close the Snackbar when it's not a clickaway event
	};

	// Adjust the onClose handler for Alert (only event)
	const handleAlertClose = (event: React.SyntheticEvent) => {
		closeSnackbar(); // Close the Snackbar when the Alert's close button is clicked
	};

	return (
		<Snackbar
			open={isOpen}
			autoHideDuration={4000}
			onClose={handleSnackbarClose} // Use the correct handler for Snackbar
			anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
		>
			<Alert
				onClose={handleAlertClose} // Use the correct handler for Alert (only event)
				severity={severity}
				sx={{ width: "100%" }}
			>
				{message}
			</Alert>
		</Snackbar>
	);
};

export default SnackbarComponent;
