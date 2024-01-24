import * as slugify from "slugify";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import ImageIcon from '@material-ui/icons/Image';
import DocIcon from '@material-ui/icons/DescriptionSharp';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Button, DialogContent } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import useStyles from "./style";
import DangerouslySetHtmlContent from "dangerously-set-html-content";
import { saveAs } from "file-saver";

export function QuickLinkDialog(props) {
  const classes = useStyles();
  const location = useLocation();
  const { quickLink, children, downloadMediaFile } = props;
  const [quickLinkSubLinks, setQuickLinkSubLinks] = useState(children);
  const { text, embedVideo, uploadAttachment, originalFileName, fileName, uploadAttachmentPath  } = quickLink;

  const [open, setOpen] = React.useState(false);


  const getFileName = (filePath) => {
    let filename = filePath.split("/");
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

  const handleClick = (ev) => {
    // If open a quick link
    if (!open) {
      const quickLinkPath = slugify(quickLink.name, {
        lower: true,
      });
      ReactGA.send({ hitType: "pageview", page: `/quick-links/${quickLinkPath}${location.search}` });
    } else {
      // If closing then track the previous page
      //ReactGA.pageview(location.pathname + location.search);
    }
    setOpen(!open);
  };

  useEffect(() => {
    setQuickLinkSubLinks(quickLinkSubLinks)
  }, [quickLinkSubLinks]);

  return (
    <>
      <div className={classes.quickLinksButton} onClick={handleClick} >{quickLinkSubLinks}</div>
      <Dialog fullWidth maxWidth="sm" onClose={handleClick} open={open} >
        <DialogTitle className={classes.title} disableTypography={true} >
          <Typography className={classes.heading1} role="heading" variant="span" aria-level="2" >{quickLink.name}</Typography>
          <IconButton className={classes.closeButton} onClick={handleClick} aria-label='Close'>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <List>

            <Divider />

            <ListItem className={classes.listItem}>
              <div
                dangerouslySetInnerHTML={{ __html: text }}
              ></div>
            </ListItem>

            <Divider />

            {embedVideo && (
              <Fragment>
                <ListItem className={classes.listItem}>
                  <Typography className={classes.heading2} role="heading" aria-level="3" variant="span">Video(s)</Typography>
                  <DangerouslySetHtmlContent
                    html={embedVideo}
                    className={embedVideo?.includes('<script') ? classes.embedContainer2 : classes.embedContainer}
                  />
                </ListItem>
                <Divider />
              </Fragment>
            )}

            {uploadAttachment && (
              <Fragment>
                <ListItem className={classes.listItem}>
                  <Typography className={classes.heading2} role="heading" aria-level="3">Attachment(s)</Typography>

                  <Link href='#' onClick={
                    () => {
                      saveAs(uploadAttachmentPath, originalFileName);
                      // downloadMediaFile({ name: fileName, orginalFileName: originalFileName });
                    }
                  }>
                    {isImage(uploadAttachment) ? (
                      <ImageIcon style={{ marginBottom: '-5px', fill: "#89ba39" }} noWrap />
                    ) : (<DocIcon style={{ marginBottom: '-5px', fill: "#89ba39" }} noWrap />)}

                    {/* {getFileName(uploadAttachment)} */}
                    {originalFileName}
                  </Link>
                </ListItem>
                <Divider />
              </Fragment>
            )}



          </List>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default connect(null, null)(QuickLinkDialog);