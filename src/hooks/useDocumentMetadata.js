import { useEffect } from "react";

const useDocumentMetadata = ({ description, title }) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    if (!description) {
      return;
    }

    const descriptionTag = document.querySelector('meta[name="description"]');

    if (descriptionTag) {
      descriptionTag.setAttribute("content", description);
    }
  }, [description, title]);
};

export default useDocumentMetadata;
