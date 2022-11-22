import { Box, Typography } from "@mui/material";
import { PropsWithChildren } from "react";

function Catalog({ children }: PropsWithChildren<{}>) {
    return <div>{children}</div>;
}
namespace Catalog {
    export const Container = ({ children }: PropsWithChildren<{}>) => {
        return <Box>{children}</Box>;
    };

    export const Heading = ({ children }: PropsWithChildren<{}>) => {
        return <Typography variant="h4">{children}</Typography>;
    };

    export const Subtitle = ({ children }: PropsWithChildren<{}>) => {
        return <Typography variant="h5">{children}</Typography>;
    };

    export const Description = ({ children }: PropsWithChildren<{}>) => {
        return <Typography variant="h6">{children}</Typography>;
    };
}

export { Catalog };
