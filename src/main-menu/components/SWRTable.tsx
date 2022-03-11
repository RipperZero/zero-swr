import { FC, useEffect } from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import {
  Theme,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { useGetOptions } from "../hooks";
import { SWRBox } from "./SWRBox";

const createData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) => {
  return { name, calories, fat, carbs, protein };
};

const ROWS = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    example: {},
  });
});

type SWRTableProps = {};

export const SWRTable: FC<SWRTableProps> = () => {
  // hooks start
  const classes = useStyles();

  const { data, isValidating, getOptionsMutate } = useGetOptions();
  // hooks end
  // useEffect functions start
  useEffect(() => {
    console.log("isValidating------" + isValidating);
  }, [isValidating]);
  // useEffect functions end

  // logic functions start
  // logic functions end

  // render functions start
  const renderContent = () => {
    return (
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ProductId</TableCell>
                <TableCell align="center">OptionName</TableCell>
                <TableCell align="center">Required</TableCell>
                <TableCell align="center">Min&nbsp;(minimum)</TableCell>
                <TableCell align="center">Max&nbsp;(maximum)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {ROWS.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))} */}
              {data?.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell align="center">{item.id}</TableCell>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">
                      {item.option_required ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="center">{item.minimum}</TableCell>
                    <TableCell align="center">{item.maximum}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <SWRBox />
        <Button
          variant="contained"
          onClick={() => {
            getOptionsMutate().then((res) => {
              console.log(res);
            });
          }}
        >
          Fetch
        </Button>
      </Box>
    );
  };

  return data ? renderContent() : <CircularProgress />;
  // render functions end
};
