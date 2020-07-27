import React, { useState } from 'react'

import { TextField } from "@material-ui/core"

function Search() {

    return (
        <div>
            <TextField
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                label="Search Country"
                fullWidth
                variant="outlined" />
        </div>
    )
}

export default Search
