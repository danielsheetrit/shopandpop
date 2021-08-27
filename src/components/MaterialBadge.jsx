import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 7,
    },
}))(Badge);

export function MaterialBadge({ numOfItems }) {
   
    return (
        <StyledBadge
            badgeContent={numOfItems}
            color="secondary"
            showZero
        >
            <ShoppingCartIcon />
        </StyledBadge>
    );
}