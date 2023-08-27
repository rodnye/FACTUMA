
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"

export default function ({children, className}) {
    return (
      <Card variant="outlined" className={className}>
        <CardContent className="d-flex flex-column justify-content-center">
          {children}
        </CardContent>
      </Card>
    )
}