//packages
import React from "react";
import { Helmet } from "react-helmet-async";

//type
interface HelmetPropsType {
  title: string;
  metaName?: string;
  metaData?: string;
}

//it is custom helmet component, we can reuse it in multiple places.
const CustomHelmet = ({
  title,
  metaData,
  metaName,
}: HelmetPropsType): React.ReactElement => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default CustomHelmet;
