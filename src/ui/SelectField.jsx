
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'


export default function SelectField ({label, disabled, value, error, list, onChange}) {
    return (
        <FormControl className="m-1" fullWidth>
            <InputLabel 
                id="select-label"
                error={error}
                disabled={disabled} 
            > {label} </InputLabel>
            
            <Select
                labelId="select-label"
                variant="standard"
                defaultValue=""
                value={value}
                label={label}
                disabled={disabled}
                error={error}
                onChange={onChange}
            >
                {list.map(item => {
                    let itemValue = typeof(item) === "string" ? item : item.value;
                        
                    return <MenuItem 
                        key={itemValue} 
                        value={itemValue}
                    > {itemValue} </MenuItem> 
                })}
           </Select>
           
        </FormControl>
    )
}