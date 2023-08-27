
import TextField from '@mui/material/TextField'


export default function _TextField ({disabled, label, error, type, value, onChange}) {
    return (
        <TextField
            className="m-1"
            variant="standard"
            label={label}
            disabled={disabled}
            error={error}
            type={type}
            value={value}
            onChange={onChange}
        />
    )
}