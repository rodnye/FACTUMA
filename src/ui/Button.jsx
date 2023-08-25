
import Button from '@mui/material/Button'

export default function _Button ({variant, onClick, children}) {
    return (
        <Button
          className="m-1"
          variant={variant || "contained"}
          onClick={onClick}
        >
            { children }
        </Button>
    )
}