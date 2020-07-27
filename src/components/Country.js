import React, { useState } from 'react'

import {
    Card, CardContent, Typography,
    CardMedia, CardActions, Button,
    Table, TableHead, TableRow,
    TableCell, TableBody
} from "@material-ui/core"
import numeral from "numeral"

import "./Country.css"
import CustomDialog from './CustomDialog'
import { useStateValue } from '../StateProvider'



function Country({ country }) {
    const [{ countries }] = useStateValue();
    const [openDialog, setOpenDialog] = useState(false)

    const handleOpenDialog = () => setOpenDialog(true)
    const handleCloseDialog = () => setOpenDialog(false)

    const keys = Object.keys(country).filter(key => key !== "flag")

    const renderRow = keys.map((key, index) => {
        if (country[key] instanceof Array || country[key] instanceof Object) {
            return (
                <TableRow key={index}>
                    <TableCell>
                        {key === "latlng" ? "Latitude & Longitude" : key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                    </TableCell>
                    <TableCell>
                        {
                            key === "languages"
                                ? country[key].map(country => country + " ")
                                : (
                                    key === "borders" && key.length > 0
                                        ? country[key].map(border => countries.filter(country => country.alpha3Code === border)[0].name + " ")
                                        : "-"
                                )
                        }
                    </TableCell>
                </TableRow>
            )
        } else {
            return (
                <TableRow key={index}>
                    <TableCell>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })}
                    </TableCell>
                    <TableCell>
                        {
                            !isNaN(country[key])
                                ? (
                                    key !== "latlng"
                                        ? numeral(country[key]).format("0,0")
                                        : country[key]
                                )
                                : (
                                    country[key] === ""
                                        ? "-"
                                        : country[key]
                                )
                        }</TableCell>
                </TableRow>
            )
        }
    }
    )

    return (
        <div className="country">
            <Card>
                <CardMedia>
                    <img src={country.flag} alt="" className="country__image" />
                </CardMedia>
                <CardContent>
                    <Typography
                        gutterBottom
                        component="p">
                        {country.name}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        component="p">
                        {country.capital !== "" ? country.capital : "Not Specified"}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        style={{ width: "100%" }}
                        onClick={handleOpenDialog}>
                        Give me more information
                        </Button>
                </CardActions>
            </Card>

            <CustomDialog
                isOpen={openDialog}
                handleClose={handleCloseDialog}
                title={country.name}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Key</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderRow}</TableBody>
                </Table>
            </CustomDialog>
        </div >
    )
}

export default Country
