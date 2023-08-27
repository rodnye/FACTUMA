
import Button from '@mui/material/Button'

export default function _Button ({disabled, variant, onClick, children}) {
    return (
        <Button
          className="m-1"
          disabled={disabled}
          variant={variant || "contained"}
          onClick={onClick}
        >
            { children }
        </Button>
    )
}