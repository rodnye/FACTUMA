
import TextField from '@mui/material/TextField'


export default function _TextField ({label, type, value, onChange}) {
    return (
        <TextField
            className="m-1"
            variant="standard"
            label={label}
            type={type}
            value={value}
            onChange={onChange}
        />
    )
}