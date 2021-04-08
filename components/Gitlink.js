import GitHubIcon from '@material-ui/icons/GitHub';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const Gitlink = () => {
    const classes = useStyles();
    return ( 
        <>
            <Link href = "https://github.com/VirajPatidar" color="inherit" target="_blank">
                <Button
                    // variant="outlined"
                    display="inline"
                    color="default"
                    className={classes.button}
                    startIcon={<GitHubIcon />}
                >
                    Viraj Patidar
                </Button>
            </Link>
        </> 
    );
}
 
export default Gitlink;