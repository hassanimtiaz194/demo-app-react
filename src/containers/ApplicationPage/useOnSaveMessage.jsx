import React from "react";

const SAVED_FORM_MESSAGE_TIMOUT = 2000;

export function useOnSaveMessage(formSavedId) {
  const [open, setOpen] = React.useState(false);
  const [formSavedTimeout, setFormSavedTimeout] = React.useState(null);

  const showSavedFormMessage = () => {
    if (formSavedTimeout) {
      clearTimeout(formSavedTimeout);
      setFormSavedTimeout(null);
    }
    setOpen(true);
    setFormSavedTimeout(
      setTimeout(() => {
        setOpen(false);
        setFormSavedTimeout(null);
      }, SAVED_FORM_MESSAGE_TIMOUT)
    );
  };

  React.useEffect(() => {
    if (formSavedId) showSavedFormMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSavedId]);

  return open;
}
