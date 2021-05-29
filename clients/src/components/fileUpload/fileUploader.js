import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
const FileUploader = ({ values, setValues, setImgloading }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const resizeImageAndUpload = (e) => {
    // console.log(e.target.files);
    setImgloading(true);
    const files = e.target.files;
    const prevImages = values.images;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                process.env.REACT_APP_API + "upload-images/",
                { image: uri },
                {
                  headers: {
                    idtoken: user.idtoken,
                  },
                }
              )
              .then((res) => {
                console.log(res.data);
                prevImages.push(res.data);
                setValues({ ...values, images: prevImages });
                setImgloading(false);
              })
              .catch((err) => {
                console.log(err);
                setImgloading(false);
              });
          },
          "base64"
        );
      }
    }
  };
  return (
    <div>
      <label className="btn btn-primary btn-raised">
        Upload Images
        <input
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={resizeImageAndUpload}
        />
      </label>
    </div>
  );
};

export default FileUploader;
