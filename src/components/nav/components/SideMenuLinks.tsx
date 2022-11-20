import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider,
    List,
    ListItemButton,
    Typography,
} from "@mui/material";
import LinkRouter from "@router/LinkRouter";
import React from "react";
import { salaryLinks, sideBarLinks, calcLinks } from "../exports/utils";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SideMenuLinks: React.FC<{ handleDrawerClose: () => void }> = ({
    handleDrawerClose,
}) => {
    return (
        <List sx={{ mb: 10 }}>
            {sideBarLinks.map((link) => (
                <React.Fragment key={link.name}>
                    <LinkRouter path={link.path}>
                        <ListItemButton onClick={handleDrawerClose}>
                            {link.name}
                        </ListItemButton>
                    </LinkRouter>
                    <Divider />
                </React.Fragment>
            ))}
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Калькулятор</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {calcLinks.map((link) => (
                        <React.Fragment key={link.name}>
                            <LinkRouter path={link.path}>
                                <ListItemButton onClick={handleDrawerClose}>
                                    {link.name}
                                </ListItemButton>
                            </LinkRouter>
                        </React.Fragment>
                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Зарплата</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {salaryLinks.map((link) => (
                        <React.Fragment key={link.name}>
                            <LinkRouter path={link.path}>
                                <ListItemButton onClick={handleDrawerClose}>
                                    {link.name}
                                </ListItemButton>
                            </LinkRouter>
                        </React.Fragment>
                    ))}
                </AccordionDetails>
            </Accordion>
        </List>
    );
};

export default SideMenuLinks;
