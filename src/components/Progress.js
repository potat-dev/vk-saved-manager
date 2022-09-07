// import * as React from "react";
// import PropTypes from "prop-types";
// import { styled } from '@mui/material/styles';
// import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";

// const CustomProgress = styled(LinearProgress)(({ theme }) => ({
//   height: 10,
//   borderRadius: 5,
//   [`& .${linearProgressClasses.bar}`]: {
//     borderRadius: 5,
//   }
// }));

// export default function Progress(props) {
//   const value = Number.isNaN(props.value) ? 0 : Math.round(props.value);
//   console.log(value, value.isNaN);
//   return (
//     <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 2 }}>
//       <Box sx={{ width: "100%" }}>
//         <CustomProgress
//           variant="determinate"
//           value={value}
//         />
//       </Box>
//       <Box sx={{ minWidth: 35 }}>
//         <Typography variant="body2" color="text.secondary">
//           {`${value}%`}
//         </Typography>
//       </Box>
//     </Box>
//   );
// }

// Progress.propTypes = {
//   value: PropTypes.number.isRequired,
// };


// convert to class component

import * as React from "react";
import PropTypes from "prop-types";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CustomProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    // transition: "none"
  }
  // .MuiLinearProgress-bar {
  // }
}));

export default class Progress extends React.Component {
  render() {
    const value = Number.isNaN(this.props.value) ? 0 : Math.round(this.props.value);
    console.log(value, value.isNaN);
    return (
      <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap: 2 }}>
        <Box sx={{ width: "100%" }}>
          <CustomProgress
            variant="determinate"
            value={value}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">
            {`${value}%`}
          </Typography>
        </Box>
      </Box>
    );
  }
}

Progress.propTypes = {
  value: PropTypes.number.isRequired,
};