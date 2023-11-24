import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { useRouter } from "~/hooks/useRouter";

export const Header = () => {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            onClick={() => router("/")}
            fontWeight="bold"
            letterSpacing="0.3em"
            sx={{ cursor: "pointer" }}
          >
            HIQUEA
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
