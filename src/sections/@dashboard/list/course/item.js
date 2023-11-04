import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
  CardActions,
  CardHeader,
  Link
} from "@mui/material";
import snackbarUtils from "@/utils/snackbar-utils";
import { useRouter } from "next/navigation";

export default function Item(props) {
  const { product, positive = false, sx } = props;
  const router = useRouter();

  const handleShowQuiz = (item) => {
    router.push({
      pathname: `client/course/[id]`,
      query: { id: item.id },
    });
  };

  return (
    <Card
      sx={sx}
      style={{
        boxShadow:
          "0px 5px 22px rgba(0, 0, 0, 0.15), 0px 5px 22px rgba(0, 0, 0, 0.03)",
        borderRadius: 5,
      }}
    >
      <Stack
        onClick={() => handleShowQuiz(product)}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height={"6.25rem"}
        padding="1rem 1rem 0.75rem"
        sx={{ backgroundColor: "rgb(75, 79, 94)", cursor: "pointer" }}
      >
        <Typography color="white" variant="h5" textTransform="uppercase">
          <Link href={`/home/client/course/${product.id}`} color="inherit" underline="hover">
            {product.fullName}
          </Link>
        </Typography>
        <Stack display="flex" flexDirection="row" alignItems="center">
          <Typography color="white" noWrap>
            {product.shortName}
          </Typography>
        </Stack>
      </Stack>
      <CardContent
        onClick={() => handleShowQuiz(product)}
        style={{
          display: "flex",
          padding: "0.75rem 1rem",
          cursor: "pointer",
          flexGrow: 1,
        }}
      >
        {/* <Typography>{product.description}</Typography> */}
      </CardContent>
    </Card>
  );
}

Item.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
