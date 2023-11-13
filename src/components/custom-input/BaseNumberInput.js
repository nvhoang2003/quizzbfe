import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const BaseIncrement = forwardRef(({ quantity, setQuantity, min, max, sx, inputProps }, ref) => {
  const handleChange = (value) => {
    setQuantity(
      parseFloat(value < max ? (!value || value < min ? min : value) : quantity)
    );
  };

  return (
    <Stack ref={ref}>
      <input
        id="base-increment"
        value={quantity}
        type="number"
        step={0.1}
        {...inputProps}
        min={min}
        max={max}
        style={{
          display: "flex",
          width: ((quantity + "").length + 1) * 8 + 16,
          fontSize: 15,
          marginRight: 1,
          ...sx
        }}
        onChange={(event) => handleChange(event.target.value)}
      />
    </Stack>
  );
});

BaseIncrement.propTypes = {
  sx: PropTypes.object,
  inputProps: PropTypes.object,
  quantity: PropTypes.number,
  setQuantity: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default BaseIncrement;
