import React, { useState } from "react";
import { useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

// import context
import { RoomContext } from "../../Context/Context";

// import components
import Title from "../Title/Title";

// get all unique values
const getUnique = (items, value) => {
  return [...new Set(items.map((item) => item[value]))];
};

export default function RoomFilter({ rooms }) {
  const context = useContext(RoomContext);

  const {
    handleChange,
    type,
    capacity,
    price,
    minPrice,
    maxPrice,
    minSize,
    maxSize,
    breakfast,
    pets,
  } = context;

  // get unique types
  let types = getUnique(rooms, "type");
  // add all
  types = ["all", ...types];
  // map to jsx
  types = types.map((item, index) => {
    return (
      <MenuItem value={item} key={index}>
        {item}
      </MenuItem>
    );
  });

  // room guests filtering functionality
  let people = getUnique(rooms, "capacity");
  people = people.map((item, index) => {
    return (
      <MenuItem value={item} key={index}>
        {item}
      </MenuItem>
    );
  });

  return (
    <section className="filter-container">
      <Title title="search rooms" />
      <form className="filter-form">
        {/* select type start */}
        <FormControl fullWidth size="small" className="form-group">
          <label for="search">Room type</label>
          <Select
            name="type"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            onChange={handleChange}
          >
            {types}
          </Select>
        </FormControl>
        <FormControl fullWidth size="small" className="form-group">
          <label>Guests</label>
          <Select
            name="capacity"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={capacity}
            onChange={handleChange}
          >
            {people}
          </Select>
        </FormControl>
        <div className="form-group">
          <label htmlFor="price">room price ${price}</label>
          <Slider
            type="range"
            name="price"
            id="price"
            min={minPrice}
            max={maxPrice}
            value={price}
            aria-label="Default"
            valueLabelDisplay="auto"
            onChange={handleChange}
          />
        </div>
        {/* room price end */}

        {/* size start */}
        <div className="form-group">
          <label htmlFor="size">room size</label>

          <div className="size-inputs">
            <TextField
              name="minSize"
              type="number"
              id="outlined-basic"
              value={minSize}
              label="minSize"
              variant="outlined"
              onChange={handleChange}
              size="small"
              style={{marginRight: "10px"}}
            />
            <TextField
              name="maxSize"
              type="number"
              id="outlined-basic"
              value={maxSize}
              label="maxSize"
              variant="outlined"
              onChange={handleChange}
              size="small"
            />
          </div>
        </div>
        {/* size end */}

        {/* extras start */}
        <div className="form-group" style={{ display: "flex", marginTop: "30px" }}>
          {/* breakfast checked */}
          <div className="single-extra">
            <Checkbox
              type="checkbox"
              name="breakfast"
              id="breakfast"
              checked={breakfast}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>

          {/* pets checked */}
          <div className="single-extra">
            <Checkbox
              type="checkbox"
              name="pets"
              id="pets"
              checked={pets}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <label htmlFor="pets">pets</label>
          </div>
        </div>
        {/* extras end */}
      </form>
    </section>
  );
}
