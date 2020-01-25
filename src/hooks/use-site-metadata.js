import { useStaticQuery, graphql } from "gatsby";

export default () => {
    const { site } = useStaticQuery(
        graphql`
            query SiteMetaData {
                site {
                    siteMetadata {
                        siteTitle
                        siteSubtitle
                        siteDescription
                        siteImage
                        twitter
                        name
                        siteUrl
                    }
                }
            }
        `
    );

    return site.siteMetadata;
};
