import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Link, ListItemButton } from "@mui/material";
import LinkRouter from "@router/LinkRouter";
import React from "react";
import { appBarLinks } from "../exports/utils";

const HeaderLinks: React.FC<{}> = (props) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mr: 2,
                }}
            >
                <Link
                    href="https://github.com/kamik0t0/tax-calculator"
                    color="inherit"
                    target="_blank"
                >
                    <GitHubIcon
                        fontSize="large"
                        sx={{
                            "&:hover": { cursor: "pointer" },
                        }}
                    />
                </Link>
            </Box>
            {appBarLinks.map((link) => (
                <LinkRouter key={link.name} path={link.path}>
                    <ListItemButton sx={{ color: "#fff" }}>
                        {link.name}
                    </ListItemButton>
                </LinkRouter>
            ))}
        </Box>
    );
};

export default HeaderLinks;
