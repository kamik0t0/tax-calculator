// import { Container } from "@mui/system";
// import React, { FC } from "react";

// const Contacts: FC = () => {
//     return <Container>Мои контакты</Container>;
// };

// export default Contacts;
import * as React from "react";
import Box from "@mui/material/Box";
import { pink } from "@mui/material/colors";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";
import Icon from "@mui/material/Icon";
import { green } from "@mui/material/colors";
import { visuallyHidden } from "@mui/utils";

function HomeIcon(props: SvgIconProps) {
    return (
        <SvgIcon {...props}>
            <path d="M22 4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4zm-2 13.17L18.83 16H4V4h16v13.17zM13 5h-2v4H7v2h4v4h2v-4h4V9h-4z" />
        </SvgIcon>
    );
}

export default function SvgIconsColor() {
    return (
        <>
            <Box
                sx={{
                    "& > :not(style)": {
                        m: 2,
                    },
                }}
            >
                <HomeIcon fontSize="large" />
                <HomeIcon fontSize="small" color="primary" />
                <HomeIcon color="secondary" />
                <Icon>star</Icon>
                <HomeIcon color="success" />
                <HomeIcon color="action" />
                <HomeIcon color="disabled" />
                <HomeIcon sx={{ color: pink[500], fontSize: 65 }} />
            </Box>
            <Box
                sx={{
                    "& > :not(style)": {
                        m: 2,
                    },
                }}
            >
                <Icon fontSize="large">add_circle</Icon>
                <Icon color="secondary">add_alert</Icon>
                <Icon color="primary">add_circle</Icon>
                <Icon sx={{ color: green[500] }}>add_circle</Icon>
                <Icon fontSize="small">add_circle</Icon>
                <Icon sx={{ fontSize: 30 }}>add_circle</Icon>
            </Box>
            <Icon>add_circle</Icon>
            <Box component="span" sx={visuallyHidden}>
                Create a user
            </Box>
        </>
    );
}
