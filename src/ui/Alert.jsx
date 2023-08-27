
import Fade from '@mui/material/Fade'
import Alert from '@mui/material/Alert'

export default function _Alert ({show, type, className, children}) {
    return (
        <Fade timeout={1000} in={show}>
            <Alert
                className={className}
                severity={type || "info"}
            > {children} </Alert>
        </Fade>
    );
}