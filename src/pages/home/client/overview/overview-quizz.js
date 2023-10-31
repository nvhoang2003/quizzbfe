import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';
import { useRouter } from 'next/navigation';

//---------------------------------------------------------
export default function OverviewQuizz(props) {
  const { products, sx } = props;
  const { push } = useRouter();
  console.log(products);
  //check time

  const handleClick = (id) => {
    // console.log(id);
    push(`/testquiz/${id}`);
  }


  return (
    <Card sx={sx}>
      <CardHeader title="Quizz" />
      <List>
        {products?.map((product, index) => {
          const hasDivider = index < products.length - 1;
          // const ago = formatDistanceToNow(product.updateDate);

          return (
            <ListItem
              divider={hasDivider}
              key={product.id}
              onClick={() => handleClick(product.id)}
            // onClick={handleClick(product.courseid)}
            >
              <ListItemAvatar>
                {
                  product.image
                    ? (
                      <Box
                        component="img"
                        src={product.image}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>
              <ListItemText
                primary={product.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
                secondaryTypographyProps={{ variant: 'body2' }}
              />
              <IconButton edge="end">
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
            </ListItem>
          );
        })}
      </List>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewQuizz.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object
};
