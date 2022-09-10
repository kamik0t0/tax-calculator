import { Button, Container, Fab } from "@mui/material";
import React, { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
/* TODO: правиль типизировать пропсы-функции */
const LastRow: FC<{ createItem: () => void; deleteItem: () => void }> = ({
    createItem,
    deleteItem,
}) => {
    return (
        <Container
            sx={{
                "& > :not(style)": { m: 1 },
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <Fab
                onClick={createItem}
                color="secondary"
                aria-label="add"
                size="small"
            >
                <AddIcon />
            </Fab>
            <Button
                onClick={deleteItem}
                variant="outlined"
                startIcon={<DeleteIcon />}
            >
                Удалить отмеченные
            </Button>
        </Container>
    );
};

export default LastRow;
