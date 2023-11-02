import PropTypes from 'prop-types';
import ArrowDownIcon from '@heroicons/react/24/solid/ArrowDownIcon';
import ArrowUpIcon from '@heroicons/react/24/solid/ArrowUpIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
import snackbarUtils from '@/utils/snackbar-utils';
import { useRouter } from 'next/navigation';

export default function OverviewCourse(props) {
  const { products, positive = false, sx } = props;
  const router = useRouter();

  const handleShowQuiz = (item) => {
    router.push({
      pathname: `client/course/[id]`,
      query: { id: item.id },
    });
  }

  return (
    <Card sx={sx}>
      <CardContent onClick={() => handleShowQuiz(products)}>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="h5"
            >
              {products.shortName}
            </Typography>
            {/* <Typography variant="h4">
              {products.shortName}
            </Typography> */}
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
        {products.endDate && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Stack
              alignItems="center"
              direction="row"
              spacing={0.5}
            >
              {/* <SvgIcon
                color={positive ? 'success' : 'error'}
                fontSize="small"
              >
                {positive ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </SvgIcon> */}
            </Stack>
            {/* <Typography
              color="text.secondary"
              variant="caption"
            >
              {products.createBy}
            </Typography> */}
          </Stack>
        )}
      </CardContent>
    </Card >
  );
};

OverviewCourse.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  sx: PropTypes.object,
  value: PropTypes.string.isRequired
};
