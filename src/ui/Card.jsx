
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"

export default function ({children}) {
    return (
      <Card variant="outlined">
        <CardContent className="d-flex flex-column align-items-center justify-content-center">
          {children}
        </CardContent>
      </Card>
    )
}