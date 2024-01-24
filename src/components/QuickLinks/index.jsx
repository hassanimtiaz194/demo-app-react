import React, { useEffect, useState } from "react";
import * as slugify from "slugify";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ListItemText from "@material-ui/core/ListItemText";
import LinkIcon from '@material-ui/icons/Link'
import ListItemIcon from "@material-ui/core/ListItemIcon";
import List from "@material-ui/core/List";
import { Button, MenuItem } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import useStyles from "./style";
import Link from "@material-ui/core/Link";
import { DialogContent } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import ImageIcon from '@material-ui/icons/Image';
import DocIcon from '@material-ui/icons/DescriptionSharp';


function QuickLinks(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogTitle, setDialogTitle] = React.useState('');
    const { selectedBracketId, quickLinks } = props;
    const [dialogData, setDialogData] = useState();
    const location = useLocation();
    const handleClick = () => {
        setOpen(!open);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleDialogClick = (evt) => {
       const quickLinkPath = slugify(evt.target.innerText, {
            lower: true,
        });
        ReactGA.send({ hitType: "pageview", page: `/quick-links/${quickLinkPath}${location.search}` });
        setDialogTitle(evt.target.innerText);
        /* setDialogData(quickLinks.find((links) => {
            return links.name.toUpperCase() === dialogTitle;
        })); */
        setDialogOpen(true);
    };
    const getFileName = (filePath) => {
        let filename = filePath.split("/")
        if (filePath)
            return filename[filename.length - 1];
        else
            return "No file path found";
    };

    const isImage = (filePath) => {
        let type = filePath.split('.');
        //let type =  fileName.split('.').pop();
        if (type[type.length - 1] === "jpg" || type[type.length - 1] === "png" || type[type.length - 1] === "JPG" || type[type.length - 1] === "PNG" || type[type.length - 1] === "gif" || type[type.length - 1] === "GIF")
            return true;
        else
            return false;
    };
    useEffect(() => {
        if (dialogTitle !== '') {
            setDialogData(quickLinks.find((links) => {
                return links.name.toUpperCase() === dialogTitle;
            }));
        }

    }, [dialogTitle, dialogData, setDialogData]);

    return (
        <>
            <MenuItem
                className={classes.listItem}
                onClick={handleClick}
                tabIndex={0}
            >
                <ListItemIcon>
                    <LinkIcon style={{ fill: "#fff" }} />
                </ListItemIcon>
                <ListItemText primary="Quick Links" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </MenuItem>
            <Collapse className={classes.nestedItemsContainer} in={open} timeout="auto" unmountOnExit>
                {!selectedBracketId && (
                    <ListItem className={classes.listItem}>
                        <Typography variant="caption">
                            Select bracket to load quick links...
                        </Typography>
                    </ListItem>
                )}
                {quickLinks && (
                    <List component="div" className={classes.nestedItemsList} disablePadding >
                        {quickLinks.map((link) => (
                            <Button tabIndex={0} href={link.link} style={{ padding: '0px 0px 0p 0px', width: 240 }} onClick={handleDialogClick} >
                                <ListItemText primary={link.name} className={classes.nested} style={{fontWeight:'normal'}}/>
                            </Button>
                        ))}
                    </List>

                )}
            </Collapse>
            <Dialog fullWidth maxWidth="sm" onClose={handleDialogClose} open={dialogOpen} >
                <DialogTitle className={classes.title} disableTypography={true} >
                    <Typography variant="h6" tabIndex={0}>{dialogTitle}</Typography>
                    <IconButton className={classes.closeButton} onClick={handleDialogClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent tabIndex={0}>
                    <List>

                        <Divider />
                        <ListItem style={{ color: 'black' }}>
                            <div dangerouslySetInnerHTML={{ __html: dialogData?.currCmsVersion.inlineCopy }}
                            ></div>
                        </ListItem>
                        <Divider />
                        {dialogData?.currCmsVersion.embedVideo && (
                            <>
                                <ListItem className={classes.dialogListItem}>
                                    <Typography variant="subtitle2">Video(s)</Typography>
                                    <div className={classes.embedContainer}
                                        dangerouslySetInnerHTML={{
                                            __html: dialogData?.currCmsVersion.embedVideo,
                                        }}
                                    ></div>
                                </ListItem>
                                <Divider />
                            </>
                        )}

                        {dialogData?.currCmsVersion.uploadAttachment && (
                            <>
                                <ListItem className={classes.dialogListItem}>
                                    <Typography variant="subtitle2">Attachment(s)</Typography>

                                    <Link target="_blank" href={dialogData?.currCmsVersion.uploadAttachment}>
                                        {isImage(dialogData?.currCmsVersion.uploadAttachment) ? (
                                            <ImageIcon style={{ marginBottom: '-5px', fill: "#89ba39" }} noWrap />
                                        ) : (<DocIcon style={{ marginBottom: '-5px', fill: "#89ba39" }} noWrap />)}

                                        {getFileName(dialogData?.currCmsVersion.uploadAttachment)}
                                    </Link>
                                </ListItem>
                                <Divider />
                            </>
                        )}

                    </List>
                </DialogContent>

            </Dialog>
        </>
    );
}


export default QuickLinks;

