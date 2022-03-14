import { FC, useState, useEffect, useMemo } from "react";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Box, Button, Typography, TextField } from "@mui/material";
import { useGetRestaurants } from "../hooks";
import { GetRestaurantsResObj } from "@api.Restaurant";

const useStyles = makeStyles((theme) => {
  return createStyles({
    inputArea: {
      marginTop: "1em",
      marginBottom: "1em",
    },
  });
});

type ZeroPaginationProps = {};

const PAGE_SIZE = 20;

export const ZeroPagination: FC<ZeroPaginationProps> = () => {
  // hooks start
  const classes = useStyles();

  const [zipCode, setZipCode] = useState("95008");
  const [date, setDate] = useState("");
  const [waveSeq, setWaveSeq] = useState("");
  const [tagId, setTagId] = useState("");

  const { data, mutate, size, setSize, isLoadingMore, isRefreshing } =
    useGetRestaurants(
      {
        param: {
          date: date,
          wave_seq: waveSeq,
          tag_id: tagId,
          zip_code: zipCode,
        },
        size: PAGE_SIZE,
      },
      true,
      true,
    );

  // const issues = data ? [].concat(...data) : [];

  const issues = useMemo(() => {
    const _issues: GetRestaurantsResObj["restaurantResponses"] = [];

    data?.forEach((_data) => {
      _data.object.restaurantResponses.forEach((res) => _issues.push(res));
    });

    return _issues;
  }, [data]);

  const isEmpty = issues.length === 0;

  const isReachingEnd =
    isEmpty ||
    (data &&
      data[data.length - 1].object.restaurantResponses.length < PAGE_SIZE);

  // hooks end

  // useEffect functions start
  // useEffect functions end

  // logic functions start
  // logic functions end

  // render functions start
  return (
    <Box style={{ fontFamily: "sans-serif" }}>
      <Button
        variant="contained"
        onClick={() => {
          setSize(1);
        }}
      >
        load issues
      </Button>
      <Box className={classes.inputArea}>
        <TextField
          label="zip_code"
          value={zipCode}
          onChange={(event) => {
            setZipCode(event.target.value);
          }}
        />
        <TextField
          label="date"
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
          }}
        />
        <TextField
          label="wave_seq"
          value={waveSeq}
          onChange={(event) => {
            setWaveSeq(event.target.value);
          }}
        />
        <TextField
          label="tag_id"
          value={tagId}
          onChange={(event) => {
            setTagId(event.target.value);
          }}
        />
      </Box>

      <Typography>
        showing {size} page(s) of {isLoadingMore ? "..." : issues.length}{" "}
        issue(s){" "}
        <Button
          variant="contained"
          onClick={() => {
            setSize(size + 1);
          }}
        >
          {isLoadingMore
            ? "loading..."
            : isReachingEnd
            ? "no more issues"
            : "load more"}
        </Button>
        <Button
          variant="contained"
          disabled={isRefreshing}
          onClick={() => mutate()}
        >
          {isRefreshing ? "refreshing..." : "refresh"}
        </Button>
        <Button variant="outlined" disabled={!size} onClick={() => setSize(0)}>
          clear
        </Button>
      </Typography>
      {isEmpty ? <Typography>Yay, no issues found.</Typography> : null}
      {issues.map((issue) => {
        return (
          <Typography key={issue.title} style={{ margin: "6px 0" }}>
            - {issue.title}
          </Typography>
        );
      })}
    </Box>
  );
  // render functions end
};
