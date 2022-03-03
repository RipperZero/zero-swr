import { FC, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import {
  Theme,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useGetOptions } from "../hooks";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      backgroundColor: "red",
      width: "80%",
    },
  });
});

type SWRBoxProps = {};

export const SWRBox: FC<SWRBoxProps> = () => {
  // hooks start
  const classes = useStyles();

  const { data } = useGetOptions();
  // hooks end

  // useEffect functions start
  // useEffect functions end

  // logic functions start
  // logic functions end

  // render functions start
  const renderContent = () => {
    return (
      <>
        {data?.map((item) => {
          return (
            <Card key={item.id} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {item.id}
                </Typography>
                <Typography variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {item.product_id}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">
                  {item.option_required ? "Yes" : "No"}
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </>
    );
  };

  return data ? renderContent() : <></>;
  // render functions end
};
